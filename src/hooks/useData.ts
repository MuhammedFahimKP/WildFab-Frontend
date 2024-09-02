import { useEffect, useState } from "react";
import apiClient, {
  ApiClientCanceledError,
  type ApiClientError,
  type ApiClientResponse,
} from "../services/api-client";
import { AxiosRequestConfig } from "axios";

const useData = <T>(
  endpoint: string,
  delay = 0,
  requestConfig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);

      setTimeout(() => {
        apiClient
          .get<T>(endpoint, { signal: controller.signal, ...requestConfig })
          .then((res: ApiClientResponse) => {
            if (error !== null) {
              setError(null);
            }

            setData(res.data);
            setLoading(false);
          })
          .catch((err) => {
            if (err instanceof ApiClientCanceledError) return;

            if ((err as ApiClientError)?.message) {
              if (data.length > 0) {
                setData([]);
              }
              setError(err.message);
            }
            setLoading(false);
          });
      }, delay);

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, error, isLoading, setData };
};

export default useData;

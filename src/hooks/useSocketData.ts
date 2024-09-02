import { useState, useEffect } from "react";
import apiClient, {
  ApiClientError,
  ApiCLientRequestConfig,
} from "../services/api-client";
import { RootState, AppDispact } from "../store";
import { setAuthState, setAuthTokens } from "../slices/authenticationSlice";
import { useSelector, useDispatch } from "react-redux";

import { createQueryParamString } from "../utils/other-utils";

interface SocketError {
  code: number;
  reason: string;
}

const useSocketData = <T extends Object>(
  wsUrl: string,
  token: boolean,
  extraQueryParams?: { [key: string]: string | string[] },
  deps?: any[]
) => {
  let SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL;
  // SOCKET_BASE_URL = "ws://192.168.1.40:8000/";
  const [data, setData] = useState<T | null>(null);

  const [tokenChage, setTokenChange] = useState(false);

  const { access, refresh } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );
  const dispatch = useDispatch<AppDispact>();

  const handleRefreshTokenChange = (refresh: string) => {
    apiClient
      .post<{ access: string; refresh?: string }>("users/refresh/", {
        refresh: refresh,
      })
      .then((res) => {
        setTokenChange(!tokenChage);
        dispatch(setAuthTokens(res.data));
      })
      .catch((err: ApiClientError) => {
        if (err?.response?.status == 401) {
          dispatch(setAuthState("TIMED OUT"));
        }
      });
  };

  const getParams = () => {
    if (extraQueryParams && token && access) {
      return createQueryParamString({ ...extraQueryParams, token: access });
    }

    if (extraQueryParams && !token) {
      return createQueryParamString({ ...extraQueryParams });
    }

    if (token && access) {
      return createQueryParamString({ token: access });
    }

    return "";
  };

  useEffect(
    () => {
      const params = getParams();

      const ws = new WebSocket(SOCKET_BASE_URL + wsUrl + params);
      ws.onmessage = (ev: MessageEvent) => {
        const newData = JSON.parse(ev.data);

        if (newData as SocketError) {
          if (
            newData.code == 4001 &&
            newData.reason == "Token Expired" &&
            refresh
          ) {
            handleRefreshTokenChange(refresh);
          }
        }
        if (JSON.stringify(data) != JSON.stringify(newData)) {
          console.log("insie data and new data");
          setData({ ...newData });
        }
      };

      ws.onclose = (ev: CloseEvent) => {
        if (ev.code === 4001 && ev.reason == "Expired Token") {
          refresh && handleRefreshTokenChange(refresh);
        }

        setData(null);
      };

      return () => ws.close();
    },
    deps ? [...deps, tokenChage] : [tokenChage]
  );

  return { data };
};
export default useSocketData;

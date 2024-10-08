import { toast as toster } from "react-hot-toast";
import { NetworkErrorAlertProps as Props } from "./@types";

import { MdSignalWifiStatusbarConnectedNoInternet3 } from "react-icons/md";

const NetworkErrorAlert = ({ toast }: Props) => {
  return (
    <div
      id="toast-success"
      className="flex items-center w-full max-w-xs p-4 mb-4 border border-red-100  text-red-500 bg-red-50 rounded-xl  shadow-lg dark:text-gray-400 dark:bg-gray-800"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500  rounded-lg bg-red-100 ">
        <MdSignalWifiStatusbarConnectedNoInternet3 className="size-5" />
        <span className="sr-only">Check icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">No Network</div>
      <button
        type="button"
        onClick={() => toster.dismiss(toast.id)}
        className="ms-auto -mx-1.5 -my-1.5   rounded-lg focus:ring-2  inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default NetworkErrorAlert;

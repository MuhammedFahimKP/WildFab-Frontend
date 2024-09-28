import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../store";

import { UseDispatch } from "react-redux";

import ChangePassword from "../../components/user/ChangePassword";
import EmailChangeForm from "../../components/user/EmailChangeForm";

import { setAuthState } from "../../slices/authenticationSlice";

import { useEffect, useState } from "react";

const ProfileSettings = () => {
  const { user } = useSelector(
    (state: RootState) => state.persistedReducer.auth
  );

  const [emailChangeForm, setEmailChangeForm] = useState(false);

  const handleEmailChangeForm = () => setEmailChangeForm(!emailChangeForm);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 w-full ">
      <div className="w-full px-6 pb-8   border-2 border-gray-200 rounded-lg ">
        <div className="grid w-full mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              src={user?.avatar}
              // src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
              alt="Bordered avatar"
            />
          </div>
          <div className="items-center mt-8 sm:mt-14 ">
            <div className="mb-2 sm:mb-6  border-y py-8 border-gray-200">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-black"
              >
                Your email
              </label>
              <div className="flex items-center justify-center gap-4">
                <input
                  type="email"
                  id="email"
                  className="border border-black  focus:border-0 focus:bg-gray-200 focus:placeholder:text-gray-400  rounded-lg block w-full p-2.5 "
                  defaultValue={user?.email}
                  disabled
                />

                <button
                  className={`bg-black px-4 py-2 text-white rounded-lg ${
                    user?.auth_type && user.auth_type === "google"
                      ? "opacity-50"
                      : ""
                  }`}
                  disabled={user?.auth_type === "google"}
                  onClick={handleEmailChangeForm}
                >
                  {" "}
                  change
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 md:flex-row md:space-x-4 md:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium "
                >
                  Your first name
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="border border-black  focus:border-0 focus:outline-none focus:bg-gray-200 focus:placeholder:text-gray-400  rounded-lg block w-full p-2.5 "
                  // className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  placeholder="Your first name"
                  defaultValue={user?.first_name}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium  dark:text-white"
                >
                  Your last name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className="border border-black  focus:border-0 focus:outline-none focus:bg-gray-200 focus:placeholder:text-gray-400  rounded-lg block w-full p-2.5 "
                  placeholder="Your last name"
                  defaultValue={user?.last_name}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                type="submit"
                className="bg-black  px-4 py-2 rounded-lg text-white"
                // className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangePassword />
      <EmailChangeForm
        form={emailChangeForm}
        handleForm={handleEmailChangeForm}
      />
    </div>
  );
};

export default ProfileSettings;

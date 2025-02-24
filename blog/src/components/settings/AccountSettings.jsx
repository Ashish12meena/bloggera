import React from "react";
import { FiLock } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";

const AccountSettings = () => {
  return (
    <div className="p-6 max-w-lg ">
      <h2 className="text-2xl font-semibold">Your Account</h2>
      <p className="text-gray-600 hidden sm:block">
        See information about your account, download an archive of your data, or learn about your account deactivation options.
      </p>

      <div className="flex flex-col items-start mt-4 space-y-3">
        <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-200 cursor-pointer ">
          <div className="flex items-center gap-3">
            <MdManageAccounts className="text-xl" />
            <div>
              <p className="font-medium text-start">Update Account</p>
              <p className="text-sm text-gray-500 hidden sm:block">See all your account information</p>
            </div>
          </div>
          <IoIosArrowForward className="text-lg text-gray-500" />
        </button>

        <button className="flex items-center justify-between w-full px-4 py-3 hover:bg-gray-200 cursor-pointer">
          <div className="flex items-center gap-3">
            <FiLock className="text-xl" />
            <div>
              <p className="font-medium text-start">Change Your Password</p>
              <p className="text-sm text-gray-500 hidden sm:block">Change your password at any time</p>
            </div>
          </div>
          <IoIosArrowForward className="text-lg text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default AccountSettings;

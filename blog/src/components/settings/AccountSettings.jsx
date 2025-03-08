import React, { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { MdManageAccounts } from "react-icons/md";
import ProfileEdit from "../profile/ProfileEdit";

const AccountSettings = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check screen size on mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex m-1 w-full">
        {/* Left Section (Hidden on small screens when ProfileEdit is active) */}
        {!isMobile || !activeSection ? (
          <div className="p-6 w-full md:w-1/1 max-w-lg">
            <h2 className="text-2xl font-semibold">Your Account</h2>
            <p className="text-gray-600 hidden sm:block">
              See information about your account, download an archive of your data, or learn about your account deactivation options.
            </p>

            <div className="flex flex-col items-start mt-4 space-y-3">
              <button
                className={`flex items-center justify-between w-full px-4 py-3 cursor-pointer ${
                  activeSection === "updateAccount" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("updateAccount")}
              >
                <div className="flex items-center gap-3">
                  <MdManageAccounts className="text-xl" />
                  <div>
                    <p className="font-medium text-start">Update Account</p>
                    <p className="text-sm text-gray-500 hidden sm:block">See all your account information</p>
                  </div>
                </div>
                <IoIosArrowForward className="text-lg text-gray-500" />
              </button>

              <button
                className={`flex items-center justify-between w-full px-4 py-3 cursor-pointer ${
                  activeSection === "changePassword" ? "bg-gray-200" : "hover:bg-gray-200"
                }`}
                onClick={() => setActiveSection("changePassword")}
              >
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
        ) : null}

        {/* Profile Edit Section */}
        {activeSection === "updateAccount" && (
          <div className="flex-grow w-full">
            {/* Back Button for Mobile */}
            {isMobile && (
              <button
                onClick={() => setActiveSection(null)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded mb-4 hover:bg-gray-300 transition"
              >
                ← Back
              </button>
            )}
            <ProfileEdit />
          </div>
        )}
      </div>
    </>
  );
};

export default AccountSettings;

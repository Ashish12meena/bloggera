import { useState } from "react";
import { FaUser, FaLock, FaShieldAlt, FaBars } from "react-icons/fa";
import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";
import PrivacySetting from "./PrivacySetting";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const sections = [
    { id: "account", name: "Account", icon: <FaUser /> },
    { id: "security", name: "Security", icon: <FaLock /> },
    { id: "privacy", name: "Privacy", icon: <FaShieldAlt /> },
];

const SettingHome = () => {
    const [selectedSection, setSelectedSection] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex  flex-row min-h-screen p-6 ">
           
            {(selectedSection === null) && (
                <aside className="   p-4  rounded-lg ">
                    <h2 className="text-xl font-bold mb-4">Settings</h2>
                    <ul>
                        {sections.map((section) => (
                            <li
                                key={section.id}
                                className="flex items-center gap-3 p-3 cursor-pointer rounded-lg hover:bg-gray-200"
                                onClick={() => {
                                    setSelectedSection(section.id);
                                    setIsSidebarOpen(false);
                                }}
                            >
                                {section.icon} {section.name} <IoIosArrowForward className="text-lg text-gray-500" />
                            </li>
                        ))}
                    </ul>
                </aside>
            )}

            {/* Main Content (Only Show When Section is Selected) */}
            {selectedSection && (
                <main className="flex-1 bg-white  ">
                    {/* Back Button for Small Screens */}
                    <button
                        className="  hover:bg-gray-300 p-2 rounded-lg mb-4 cursor-pointer"
                        onClick={() => setSelectedSection(null)}
                    >
                    <IoIosArrowBack />
                    </button>
                    {selectedSection === "account" && <AccountSettings />}
                    {selectedSection === "security" && <SecuritySettings />}
                    {selectedSection === "privacy" && <PrivacySetting />}
                </main>
            )}
        </div>
    );
};

export default SettingHome;

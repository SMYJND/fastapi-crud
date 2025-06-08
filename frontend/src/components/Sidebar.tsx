import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <div
      className={`${
        isSidebarOpen ? "w-1/4" : "w-16"
      } transition-all duration-300 bg-blue-600 text-white p-4 relative`}
    >
      {/* Always show the menu icon */}
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="mb-4">
          <IoMdMenu size={24} />
        </button>
      )}

      {/* Close button */}
      {isSidebarOpen && (
        <button onClick={toggleSidebar} className="absolute top-4 right-4">
          <FaWindowClose size={24} />
        </button>
      )}
      {/* Sidebar content */}
      {isSidebarOpen && <SidebarContent />}
    </div>
  );
};
export default Sidebar;

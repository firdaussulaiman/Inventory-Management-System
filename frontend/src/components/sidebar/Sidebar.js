import React, { useState } from "react";
import "./Sidebar.scss";
import { HiMenuAlt3 } from "react-icons/hi";
import { BsGear } from "react-icons/bs";
import menu from "../../data/sidebar";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="layout">
      <div className="topbar">
        <div className="top_section">
          <div className="logo" onClick={goHome}>
            <BsGear size={35} />
          </div>

          <div className="menu_items">
            {menu.map((item, index) => {
              return <SidebarItem key={index} item={item} isOpen={isOpen} />;
            })}
          </div>
          
          <div className="bars">
            <HiMenuAlt3 onClick={toggle} />
          </div>
        </div>
      </div>

      <main>
        {children}
      </main>
    </div>
);
};

export default Sidebar;

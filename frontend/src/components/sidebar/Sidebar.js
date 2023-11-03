import React, { useState } from "react";
import { Drawer, IconButton, List, Toolbar } from "@mui/material";
import { BsGear } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import menu from "../../data/sidebar";

const drawerWidth = 240;

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={goHome}>
            <BsGear size={35} />
          </IconButton>
          <IconButton onClick={toggle}>
            <HiMenuAlt3 />
          </IconButton>
        </Toolbar>
        <List>
          {menu.map((item, index) => (
            <SidebarItem key={index} item={item} isOpen={isOpen} />
          ))}
        </List>
      </Drawer>
      <main style={{ marginLeft: isOpen ? drawerWidth : 0 }}>
        {children}
      </main>
      
    </div>
  );
};

export default Sidebar;

import React, { useState } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Collapse } from "@mui/material";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { styled } from '@mui/material/styles';

const LinkBehavior = React.forwardRef((props, ref) => (
  <NavLink ref={ref} {...props} />
));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  fontSize: '1.9em',
  '&.active': {
    color: theme.palette.primary.main,
  },
}));

const SidebarItem = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  if (item.childrens) {
    return (
      <div>
        <ListItem button onClick={() => setExpandMenu(!expandMenu)}>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          {isOpen && <ListItemText primary={item.title} />}
          {expandMenu ? <MdKeyboardArrowDown /> : <MdKeyboardArrowRight />}
        </ListItem>
        <Collapse in={expandMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.childrens.map((child, index) => (
              <StyledNavLink to={child.path} key={index}>
                <ListItem button>
                  <ListItemIcon>
                    {child.icon}
                  </ListItemIcon>
                  {isOpen && <ListItemText primary={child.title} />}
                </ListItem>
              </StyledNavLink>
            ))}
          </List>
        </Collapse>
      </div>
    );
  } else {
    return (
      <StyledNavLink to={item.path}>
        <ListItem button>
          <ListItemIcon>
            {item.icon}
          </ListItemIcon>
          {isOpen && <ListItemText primary={item.title} />}
        </ListItem>
      </StyledNavLink>
    );
  }
};

export default SidebarItem;

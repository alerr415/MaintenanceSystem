import * as React from 'react';
import { useState, useContext } from "react";
//import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
//import Select from '@mui/material/Select';
//import MenuItem from '@mui/material/MenuItem';
import { UserContext } from "./User.js";
import { Outlet , Link} from "react-router-dom"
import { useCookies } from "react-cookie";
import Menu from './Menu.js';



const drawerWidth = 240;

function Layout(props) {

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const {user, setUser} = useContext(UserContext);
  const [cookies, setCookie] = useCookies();



  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    setUser("off");
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return(

    <Box sx={{ display: 'flex' ,
               backgroundColor: '#f3f1f1' }}>

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },

          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Karbantart??si Rendszer
          </Typography>
        </Toolbar>
      </AppBar>


      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {<Menu userType={user.role} />}
        </Drawer>

        {/* Desktop. */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
        {<Menu userType={user.role} />}
        </Drawer>
      </Box>

      <Outlet />

    </Box>
  );
}

export default Layout;

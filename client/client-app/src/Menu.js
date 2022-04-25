import * as React from 'react';
import { useState, useContext } from "react";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import { UserContext } from "./User.js";
import { Link} from "react-router-dom"

function Menu(props) {

  const userType = props.userType;

  const {user, setUser} = useContext(UserContext);

  const logout = () => {
    setUser("off");
  };

  if (userType === "eszkozfelelos") {
    console.log("ESZKOZFELELOS MENU");
    return (
             <div>
                <Toolbar />

                <List>
                  <ListItemButton component={Link} to="/app/newDevice">
                    <ListItemIcon><AddIcon /></ListItemIcon>
                    <ListItemText>Eszköz hozzáadása</ListItemText>
                  </ListItemButton>
                  <ListItemButton component={Link} to="/app/listDevices">
                    <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                    <ListItemText>Eszközök megjelenítése</ListItemText>
                  </ListItemButton>
                </List>

                <Divider />

                <List>
                  <ListItemButton component={Link} to="/app/newCategory">
                    <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
                    <ListItemText>Kategória hozzáadása</ListItemText>
                  </ListItemButton>
                  <ListItemButton component={Link} to="/app/categories">
                    <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
                    <ListItemText>Kategóriák megjelenítése</ListItemText>
                  </ListItemButton>
                </List>

                <Divider />

                <List>
                  <ListItemButton component={Link} to="/" onClick={logout}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText>Kijelentkezés</ListItemText>
                  </ListItemButton>
                </List>

            </div>);
  } else if (userType === "operator") {
    console.log("OPERATOR MENU");
    return (
    <div>
      <Toolbar />

      <List>
        <ListItemButton component={Link} to="/app/newTask">
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText>Feladat hozzáadása</ListItemText>
        </ListItemButton>
        <ListItemButton component={Link} to="/app/listOpTasks">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText>Feladatok megjelenítése</ListItemText>
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton component={Link} to="/app/newWorker">
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText>Karbantartó hozzáadása</ListItemText>
        </ListItemButton>
        <ListItemButton component={Link} to="/app/listWorkers">
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText>Karbantartók megjelenítése</ListItemText>
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton component={Link} to="/" onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText>Kijelentkezés</ListItemText>
        </ListItemButton>
      </List>
    </div>);
  } else if (userType === "karbantarto") {
    console.log("KARBANTARTO MENU");
    return (
    <div>
      <Toolbar />

        <List>
          <ListItemButton component={Link} to="/app/listWorkerTasks">
            <ListItemIcon><BuildIcon /></ListItemIcon>
            <ListItemText>Saját feladataim</ListItemText>
          </ListItemButton>
        </List>

      <Divider />

      <List>
        <ListItemButton component={Link} to="/" onClick={logout}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText>Kijelentkezés</ListItemText>
        </ListItemButton>
      </List>


    </div>);

  }
}

export default Menu;

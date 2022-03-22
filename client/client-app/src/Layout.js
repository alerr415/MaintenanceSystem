import * as React from 'react';
import { useState, useContext } from "react";
//import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
//import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { UserContext } from "./User.js";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {serveraddress} from './Server.js';



const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {user, setUser} = useContext(UserContext);


  const addDevice = () => {
    let toSend  = {"deviceName" : document.getElementById("deviceName").value,
                   "deviceCategoryName" : type,
                   "deviceDescription" : document.getElementById("deviceDescription").value,
                   "deviceLocation" : loc}

    console.log(toSend);

    fetch(serveraddress + '/device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toSend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.errorCode === 0) {
        console.log("Sikeres Hozzáadás :D");
      } else {
        console.log("Sikertelen Hozzáadás! :(");
        console.log(data.errorMessage);
        //setFeedbackText("Hibás jelszó!");
        //hitError(true);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      //setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      //hitError(true);
    });
  }


  const [loc, setLoc] = React.useState('');

  const locChange = (event) => {
    setLoc(event.target.value);
  };

  const [type, setType] = React.useState('');

  const typeChange = (event) => {
    setType(event.target.value);
  };


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />

      <List>
        <ListItemButton>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText>Eszköz hozzáadása</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
          <ListItemText>Eszközök megjelenítése</ListItemText>
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton>
          <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
          <ListItemText>Kategória hozzáadása</ListItemText>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon><FormatListBulletedIcon /></ListItemIcon>
          <ListItemText>Kategóriák megjelenítése</ListItemText>
        </ListItemButton>
      </List>

      <Divider />

      <List>
        <ListItemButton>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText>Kijelentkezés</ListItemText>
        </ListItemButton>
      </List>


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' ,
               backgroundColor: '#f3f1f1' }}>

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100%)` },
          ml: { sm: `${drawerWidth}px` },
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
            Karbantartási Rendszer
          </Typography>
        </Toolbar>
      </AppBar>


      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` }}}
      >
        <Toolbar />

        <Grid container spacing={2}>
          <Grid item xs={0} sm={0} lg={3}></Grid>

          <Grid item xs={12} sm={12} lg={6}>
            <Card sx={{ mt: { xs : 0 , lg : 8 } }}>
              <CardContent>

                <Typography variant="h5">Eszköz hozzáadása</Typography>
                <Divider />

                <Grid container spacing={2} sx={{ mt : 1 }}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" sx={{ mt : 2 }}>Eszköz neve:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {/*  Eszköz neve */}
                    <TextField id="deviceName" label="Név" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" sx={{ mt : 2 }}>Eszköz helye:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {/*  Eszköz helye */}
                    <FormControl sx={{ mx : 'auto' , width : 1 }}>
                      <InputLabel id="locLabel">Helyszín</InputLabel>
                      <Select labelId="locLabel" id="locSelect" value={loc} onChange={locChange} label="Helyszín">
                        <MenuItem value={'mosdo'}>Mosdó</MenuItem>
                        <MenuItem value={'iroda'}>Iroda</MenuItem>
                        <MenuItem value={'folyoso'}>Folyosó</MenuItem>
                      </Select>
                    </FormControl><br />
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" sx={{ mt : 2 }}>Eszköz kategóriája:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {/*  Eszköz kategóriája */}
                    <FormControl sx={{ mx : 'auto' ,  width : 1 }}>
                      <InputLabel id="typeLabel">Kategória</InputLabel>
                      <Select labelId="typeLabel" id="typeSelect" value={type} onChange={typeChange} label="Kategória">
                        <MenuItem value={'tuzvedelem'}>Tűzvédelem</MenuItem>
                        <MenuItem value={'vilagitas'}>Világítás</MenuItem>
                        <MenuItem value={'szaniter'}>Szaniter</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <Typography variant="h6" sx={{ mt : 2 }}>Leírás:</Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    {/*  Eszköz leírása */}
                      <TextareaAutosize
                        id="deviceDescription"
                        minRows={3}
                        placeholder="Az eszköz leírása"
                        style={{ width: '100%' }}
                      />
                  </Grid>

                </Grid>
              </CardContent>

              <CardActions>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    {/*<Button size="large" variant="outlined" color="warning" fullWidth>Mégsem</Button>*/}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button size="large" variant="contained" color="success" onClick={addDevice} fullWidth>Hozzáadás</Button>
                  </Grid>
                </Grid>
              </CardActions>

            </Card>
          </Grid>

          <Grid item xs={0} sm={0} lg={3}></Grid>
        </Grid>

      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

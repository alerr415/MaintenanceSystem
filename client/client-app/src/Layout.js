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


const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {user, setUser} = useContext(UserContext);


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
            <Card >
              <CardContent>

                <Typography variant="h5">Eszköz hozzáadása</Typography>
                <Divider />

                <Grid container spacing={2} sx={{ mt : 2 }}>
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
                        <MenuItem value={10}>Mosdó</MenuItem>
                        <MenuItem value={20}>Iroda</MenuItem>
                        <MenuItem value={30}>Folyosó</MenuItem>
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
                        <MenuItem value={10}>Tűzvédelem</MenuItem>
                        <MenuItem value={20}>Világítás</MenuItem>
                        <MenuItem value={30}>Szaniter</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                </Grid>
              </CardContent>

              <CardActions>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    {/*<Button size="large" variant="outlined" color="warning" fullWidth>Mégsem</Button>*/}
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Button size="large" variant="contained" color="success" fullWidth>Hozzáadás</Button>
                  </Grid>
                </Grid>
              </CardActions>

            </Card>
          </Grid>

          <Grid item xs={0} sm={0} lg={3}></Grid>
        </Grid>

        <Typography paragraph sx={{ mt : 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;

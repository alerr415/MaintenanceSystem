import * as React from 'react';
import { useState, useContext } from "react";
//import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
//import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
//import List from '@mui/material/List';
//import ListItem from '@mui/material/ListItem';
//import ListItemIcon from '@mui/material/ListItemIcon';
//import ListItemText from '@mui/material/ListItemText';
//import ListItemButton from '@mui/material/ListItemButton';
//import AddIcon from '@mui/icons-material/Add';
//import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
//import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
//import LogoutIcon from '@mui/icons-material/Logout';
import Toolbar from '@mui/material/Toolbar';
//import MenuIcon from '@mui/icons-material/Menu';
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
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useCookies } from "react-cookie";

function AddDeviceScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const addDevice = () => {
    let deviceName = document.getElementById("deviceName").value;
    let deviceDescription = document.getElementById("deviceDescription").value;

    if (deviceName !== "" && type!== "" && deviceDescription !== "" && loc !== "") {
      let toSend  = {"deviceName" : deviceName,
                     "deviceCategoryName" : type,
                     "deviceDescription" : deviceDescription,
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
          setFeedbackText("Az eszköz hozzáadása megtörtént!");
          hitSuccess(true);

        } else {
          console.log("Sikertelen Hozzáadás! :(");
          console.log(data.errorMessage);
          setFeedbackText("Az eszköz hozzáadása sikertelen!");
          hitError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
        hitError(true);
      });

    } else { // ha valamelyik adat hiányzik
      console.log("Sikertelen Hozzáadás! :(");
      console.log("valamelyik mező üresen maradt");
      setFeedbackText("Az eszköz hozzáadása sikertelen! Töltse ki az összes mezőt!");
      hitError(true);
    }
  }


  const [loc, setLoc] = React.useState('');

  const locChange = (event) => {
    setLoc(event.target.value);
  };

  const [type, setType] = React.useState('');

  const typeChange = (event) => {
    setType(event.target.value);
  };

return(
  <Box
    component="main"
    sx={{ flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` }}}
  >
    <Toolbar />

    <Grid container spacing={2}>
      <Grid item xs={0} sm={0} lg={3}></Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <Card sx={{ mt: { xs : 0 , lg : 8 } }}>
          <CardContent>

            <Typography variant="h5">Új eszköz</Typography>
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

    <Snackbar open={success} autoHideDuration={6000} onClose={() => {hitSuccess(false)}} action={(<IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {hitSuccess(false)}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>)}>
      <Alert onClose={() => {hitSuccess(false)}} severity="success" variant="filled">
        {feedbackText}
      </Alert>
    </Snackbar>

    <Snackbar open={error} autoHideDuration={6000} onClose={() => {hitError(false)}} action={(<IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {hitError(false)}}
      >
        <CloseIcon fontSize="small" />
      </IconButton>)}>
      <Alert onClose={() => {hitError(false)}} severity="error" variant="filled">
        {feedbackText}
      </Alert>
    </Snackbar>

  </Box>
);

}

export default AddDeviceScreen;

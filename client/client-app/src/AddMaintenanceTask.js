import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
//import { useCookies } from "react-cookie";

function AddMaintenanceTask(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  //const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [deviceID, setDeviceID] = React.useState('');

  const deviceChange = (event) => {
    setDeviceID(event.target.value);
  };

  const [deviceList, setDeviceList] = React.useState(["d"]);
  const [deviceListFetched, setDeviceListFetched] =  React.useState(false);

  function clearForm() {
    // TODO
    document.getElementById("taskName").value = "";
    setDeviceID('');
    document.getElementById('taskDescription').value = "";
    document.getElementById("normTime").value = "";

  };


  const addTask = () => {
    let taskName = document.getElementById("taskName").value;
    let specification = document.getElementById("taskDescription").value;
    let normTime = document.getElementById("normTime").value;

    console.log("ADDTASK_PARAMS");
    console.log("deviceID: " + deviceID + " of type " + typeof deviceID);
    console.log("taskName: " + taskName + " of type " + typeof taskName);
    console.log("specification: " + specification + " of type " + typeof specification);
    console.log("normTime: " + normTime + " of type " + typeof normTime);

    if (taskName !== "" && deviceID!== "" && specification !== "") {
      let toSend  = {"deviceID" : deviceID.toString() ,
                     "taskName" : taskName ,
                     "specification" : specification ,
                     "normTime" : normTime.toString()
                   }

      console.log(toSend);

      fetch(serveraddress + '/maintenance', {
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
          setFeedbackText("A feladat hozzáadása megtörtént!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozzáadás! :(");
          console.log(data.errorMessage);
          setFeedbackText("A feladat hozzáadása sikertelen! " + data.errorMessage);
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
      setFeedbackText("A feladat hozzáadása sikertelen! Töltse ki az összes mezőt!");
      hitError(true);
    }
  }


  function fetchDeviceList() {
    fetch(serveraddress + '/device')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.data);
        setDeviceList(data.data);
        console.log(deviceList);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        setFeedbackText("Az eszközök lekérdezése sikertelen! " + data.errorMessage);
        hitError(true);
      }

      setDeviceListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };


  useEffect(() => {
    if (!deviceListFetched) fetchDeviceList();
  });



return (
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
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>
            <Typography variant="h5">Új karbantartási feladat</Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt : 1 }}>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Feladat megnevezése:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Feladat neve */}
                <TextField id="taskName" label="Feladat megnevezése" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Eszköz hozzárendelése:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* Az eszköz */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="deviceSelectControl">
                  <InputLabel id="deviceLabel">Eszköz</InputLabel>
                  <Select labelId="typeLabel" id="typeSelect" value={deviceID} onChange={deviceChange} label="Eszköz">
                    {deviceList.map((device, index) => (
                      <MenuItem value={device.deviceID} key={index}>{device.deviceName} - {device.deviceLocation}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Leírás:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Feladat leírása */}
                  <TextareaAutosize
                    id="taskDescription"
                    minRows={3}
                    placeholder="A meghibásodás vagy feladat leírása"
                    style={{ width: '100%' }}
                  />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Normaidő:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* normaidő */}
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="normTime" label="Normaidő (óra)" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>



            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>Mégsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addTask} fullWidth>Hozzáadás</Button>
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

export default AddMaintenanceTask;

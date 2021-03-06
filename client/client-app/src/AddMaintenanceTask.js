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

  const [deviceList, setDeviceList] = React.useState();
  const [deviceListFetched, setDeviceListFetched] =  React.useState(false);

  function clearForm() {

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
          console.log("Sikeres Hozz??ad??s :D");
          setFeedbackText("A feladat hozz??ad??sa megt??rt??nt!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozz??ad??s! :(");
          console.log(data.errorMessage);
          setFeedbackText("A feladat hozz??ad??sa sikertelen! " + data.errorMessage);
          hitError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
        hitError(true);
      });

    } else { // ha valamelyik adat hi??nyzik
      console.log("Sikertelen Hozz??ad??s! :(");
      console.log("valamelyik mez?? ??resen maradt");
      setFeedbackText("A feladat hozz??ad??sa sikertelen! T??ltse ki az ??sszes mez??t!");
      hitError(true);
    }
  }


  function fetchDeviceList() {
    fetch(serveraddress + '/device')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0 && data.data !== undefined && data.data !== null) {
        console.log("Sikeres lek??rdez??s :D");
        console.log(data.data);
        setDeviceList(data.data);
        console.log(deviceList);

      } else {
        console.log("Sikertelen lek??rdez??s! :(");
        console.log(data.errorMessage);
        //setFeedbackText("Az eszk??z??k lek??rdez??se sikertelen! " + data.errorMessage);
        //hitError(true);
      }

      setDeviceListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
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
            <Typography variant="h5">??j karbantart??si feladat</Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt : 1 }}>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Feladat megnevez??se:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Feladat neve */}
                <TextField id="taskName" label="Feladat megnevez??se" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Eszk??z hozz??rendel??se:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* Az eszk??z */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="deviceSelectControl">
                  <InputLabel id="deviceLabel">Eszk??z</InputLabel>
                  <Select labelId="typeLabel" id="typeSelect" value={deviceID} onChange={deviceChange} label="Eszk??z">
                    {deviceList !== undefined && deviceList.map((device, index) => (
                      <MenuItem value={device.deviceID} key={index}>{device.deviceName} - {device.deviceLocation}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Le??r??s:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Feladat le??r??sa */}
                  <TextareaAutosize
                    id="taskDescription"
                    minRows={3}
                    placeholder="A meghib??sod??s vagy feladat le??r??sa"
                    style={{ width: '100%' }}
                  />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Normaid??:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* normaid?? */}
                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} id="normTime" label="Normaid?? (??ra)" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>



            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>M??gsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addTask} fullWidth>Hozz??ad??s</Button>
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

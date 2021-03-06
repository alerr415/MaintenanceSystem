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

function AddMaintenanceWorker(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [qualSelectValue, setQualSelectValue] = React.useState('');

  const qualChange = (event) => {
    setQualSelectValue(event.target.value);
  };

  const [qualificationList, setQualificationList] = React.useState();
  const [qualListFetched, setQualListFetched] =  React.useState(false);

  function clearForm() {
    document.getElementById("userName").value = "";
    document.getElementById("password").value = "";
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    setQualSelectValue('');
  };

  const addWorker = () => {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;

    let qualificationID = qualSelectValue;

    console.log("ADDWORKER_PARAMS");
    console.log("lastName: " + lastName + " of type " + typeof lastName);
    console.log("firstName: " + firstName + " of type " + typeof firstName);
    console.log("qualificationID: " + qualificationID + " of type " + typeof qualificationID);

    if (lastName !== "" && firstName !== "" && qualificationID !== "" && password !== "" && userName !== "") {
      let toSend  = {"lastName" : lastName ,
                     "firstName" : firstName ,
                     "qualificationID" : qualificationID.toString() ,
                     "username" : userName ,
                     "password" : password
                   }

      console.log(toSend);

      fetch(serveraddress + '/worker', {
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
          setFeedbackText("Karbantart?? hozz??ad??sa megt??rt??nt!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozz??ad??s! :(");
          console.log(data.errorMessage);
          setFeedbackText("Karbantart?? hozz??ad??sa sikertelen! " + data.errorMessage);
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

  function fetchQualList() {
    fetch(serveraddress + '/qualification')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0 && data.qualificationList !== undefined && data.qualificationList !== null) {
        console.log("Sikeres lek??rdez??s :D");
        console.log(data.qualificationList);

        setQualificationList(data.qualificationList);

      } else {
        console.log("Sikertelen lek??rdez??s! :(");
        console.log(data.resultMessage);
        //setFeedbackText("K??pes??t??sek lek??rdez??se sikertelen! " + data.resultMessage);
        //hitError(true);
      }

      setQualListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
      hitError(true);
    });
  };

  useEffect(() => {
    if (!qualListFetched) fetchQualList();
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
            <Typography variant="h5">??j karbantart?? felv??tele</Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt : 1 }}>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Felhaszn??l??n??v:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* felhaszn??l??n??v */}
                <TextField id="userName" label="Felhaszn??l??n??v" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Jelsz??:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  jelsz?? */}
                <TextField id="password" type="password" label="Jelsz??" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Vezet??kn??v:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  vezet??kn??v */}
                <TextField id="lastName" label="Vezet??kn??v" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Keresztn??v:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* Keresztn??v */}
                <TextField id="firstName" label="Keresztn??v" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* K??pes??t??s:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* K??pes??t??s */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="qualSelectControl">
                  <InputLabel id="qualLabel">K??pes??t??s</InputLabel>
                  <Select labelId="qualLabel" id="qualSelect" value={qualSelectValue} onChange={qualChange} label="K??pes??t??s">
                    {qualificationList !== undefined && qualificationList.map((qualification, index) => (
                      <MenuItem value={qualification.qualificationID} key={index}>{qualification.qualificationName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>


            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>M??gsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addWorker} fullWidth>Hozz??ad??s</Button>
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

export default AddMaintenanceWorker;

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

function AddMaintenanceWorker(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  //const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [qualSelectValue, setQualSelectValue] = React.useState('');

  const qualChange = (event) => {
    setQualSelectValue(event.target.value);
  };

  const [qualificationList, setQualificationList] = React.useState(["d"]);
  const [qualListFetched, setQualListFetched] =  React.useState(false);
  const [disabledQualSelect, setDisabledQualSelect] =  React.useState(false);

  const handleQualificationAddingCell = (event) => {
    console.log("CHANGE");
    if (event.target.value !== "") {
      console.log("NOTEMPTY");
      setDisabledQualSelect(true);

    } else {
      console.log("EMPTY");
      setDisabledQualSelect(false);

    }
  };

  function clearForm() {

    // TODO
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    setQualSelectValue('');

  };

  const addWorker = () => {
    let userName = document.getElementById("userName").value; // <----- TODO
    let password = document.getElementById("password").value;

    let lastName = document.getElementById("lastName").value;
    let firstName = document.getElementById("firstName").value;

    let qualificationID = "";
    if (document.getElementById("qualificationAddingCell").value !== "") {
      qualificationID = document.getElementById("qualificationAddingCell").value;
    } else {
      qualificationID = qualSelectValue;
    }

    console.log("ADDWORKER_PARAMS");
    console.log("lastName: " + lastName + " of type " + typeof lastName);
    console.log("firstName: " + firstName + " of type " + typeof firstName);
    console.log("qualificationID: " + qualificationID + " of type " + typeof qualificationID);


    if (lastName !== "" && firstName !== "" && qualificationID !== "") {
      let toSend  = {"lastName" : lastName ,
                     "firstName" : firstName ,
                     "qualificationID" : qualificationID.toString() ,
                     "username" : userName ,
                     "password" : password
                   }

/*String lastName
String firstName
String qualificationID
String username
String password*/

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
          console.log("Sikeres Hozzáadás :D");
          setFeedbackText("Karbantartó hozzáadása megtörtént!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozzáadás! :(");
          console.log(data.errorMessage);
          setFeedbackText("Karbantartó hozzáadása sikertelen! " + data.errorMessage);
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


  function fetchQualList() {
    fetch(serveraddress + '/qualification')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.qualificationList);

        setQualificationList(data.qualificationList);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        setFeedbackText("Képesítések lekérdezése sikertelen! " + data.errorMessage);
        hitError(true);
      }

      setQualListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
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
            <Typography variant="h5">Új karbantartó felvétele</Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt : 1 }}>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Felhasználónév:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* felhasználónév */}
                <TextField id="userName" label="Felhasználónév" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Jelszó:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  jelszó */}
                <TextField id="password" type="password" label="Jelszó" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Vezetéknév:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  vezetéknév */}
                <TextField id="lastName" label="Vezetéknév" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Keresztnév:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* Keresztnév */}
                <TextField id="firstName" label="Keresztnév" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Képesítés:</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                {/* Képesítés */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="qualSelectControl" disabled={disabledQualSelect}>
                  <InputLabel id="qualLabel">Képesítés</InputLabel>
                  <Select labelId="qualLabel" id="qualSelect" value={qualSelectValue} onChange={qualChange} label="Képesítés">
                    {qualificationList.map((qualification, index) => (
                      <MenuItem value={qualification.qualificationID} key={index}>{qualification.qualificationName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography sx={{ mt : 2 , width : 1 , textAlign : 'center' }}>VAGY</Typography>
                <TextField id="qualificationAddingCell" label="Új képesítés" sx={{ mx : 'auto' , width : 1 , mt : 2}} variant="outlined" onChange={handleQualificationAddingCell}/><br />
              </Grid>


            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>Mégsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addWorker} fullWidth>Hozzáadás</Button>
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

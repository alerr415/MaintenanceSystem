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

function AddDeviceScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  //const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [type, setType] = React.useState('');

  const typeChange = (event) => {
    setType(event.target.value);
  };

  const [categoryList, setCategoryList] = React.useState(["d"]);
  const [catListFetched, setCatListFetched] =  React.useState(false);
  const [disabledTypeSelect, setDisabledTypeSelect] =  React.useState(false);

  const handleCategoryAddingCell = (event) => {
    console.log("CHANGE");
    if (event.target.value !== "") {
      console.log("NOTEMPTY");
      setDisabledTypeSelect(true);

    } else {
      console.log("EMPTY");
      setDisabledTypeSelect(false);

    }
  };

  function clearForm() {

    document.getElementById("deviceName").value = "";
    document.getElementById("deviceLocation").value = "";
    setType(undefined);
    document.getElementById('categoryAddingCell').value = "";
    document.getElementById("deviceDescription").value = "";

  };


  const addDevice = () => {
    let deviceName = document.getElementById("deviceName").value;
    let deviceDescription = document.getElementById("deviceDescription").value;
    let deviceLocation = document.getElementById("deviceLocation").value;
    let deviceCategoryName = "";

    if (disabledTypeSelect) {
      deviceCategoryName = document.getElementById('categoryAddingCell').value;
    } else {
      deviceCategoryName = type;
    }

    //console.log("deviceName:'" + deviceName + "'");
    //console.log("deviceLocation:'" + deviceLocation + "'");
    //console.log("deviceDescription:'" + deviceDescription + "'");
    //console.log("deviceCategoryName:'" + deviceCategoryName + "'");

    if (deviceName !== "" && type!== "" && deviceDescription !== "" && deviceLocation !== "") {
      let toSend  = {"deviceName" : deviceName,
                     "deviceCategoryName" : deviceCategoryName,
                     "deviceDescription" : deviceDescription,
                     "deviceLocation" : deviceLocation}

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

          clearForm();

        } else {
          console.log("Sikertelen Hozzáadás! :(");
          console.log(data.errorMessage);
          setFeedbackText("Az eszköz hozzáadása sikertelen! " + data.errorMessage);
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



  function fetchCatList() {
    fetch(serveraddress + '/category')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.categoryList);

        setCategoryList(data.categoryList);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        hitError(true);
      }

      setCatListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };


  useEffect(() => {
    if (!catListFetched) fetchCatList();
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
                <TextField id="deviceLocation" label="Helyszín" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Eszköz kategóriája:</Typography>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                {/*  Eszköz kategóriája */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="typeSelectControl" disabled={disabledTypeSelect}>
                  <InputLabel id="typeLabel">Létező kategória</InputLabel>
                  <Select labelId="typeLabel" id="typeSelect" value={type} onChange={typeChange} label="Létező kategória">
                    {categoryList.map((category, index) => (
                      <MenuItem value={category} key={index}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Typography sx={{ mt : 2 , width : 1 , textAlign : 'center' }}>VAGY</Typography>
                <TextField id="categoryAddingCell" label="Új független kategória" sx={{ mx : 'auto' , width : 1 , mt : 2}} variant="outlined" onChange={handleCategoryAddingCell}/><br />
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

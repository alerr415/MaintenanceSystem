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

function AddDeviceScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [type, setType] = React.useState('');

  const typeChange = (event) => {
    setType(event.target.value);
  };

  const [categoryList, setCategoryList] = React.useState();
  const [catListFetched, setCatListFetched] =  React.useState(false);
  const [disabledTypeSelect, setDisabledTypeSelect] =  React.useState(false);

  function clearForm() {

    document.getElementById("deviceName").value = "";
    document.getElementById("deviceLocation").value = "";
    setType('');
    //document.getElementById('categoryAddingCell').value = "";
    document.getElementById("deviceDescription").value = "";

  };


  const addDevice = () => {
    let deviceName = document.getElementById("deviceName").value;
    let deviceDescription = document.getElementById("deviceDescription").value;
    let deviceLocation = document.getElementById("deviceLocation").value;
    let deviceCategoryName = type;

    //console.log("deviceName:'" + deviceName + "'");
    //console.log("deviceLocation:'" + deviceLocation + "'");
    //console.log("deviceDescription:'" + deviceDescription + "'");
    //console.log("deviceCategoryName:'" + deviceCategoryName + "'");

    if (deviceName !== "" && type !== "" && deviceDescription !== "" && deviceLocation !== "") {
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
          console.log("Sikeres Hozz??ad??s :D");
          setFeedbackText("Az eszk??z hozz??ad??sa megt??rt??nt!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozz??ad??s! :(");
          console.log(data.errorMessage);
          setFeedbackText("Az eszk??z hozz??ad??sa sikertelen! " + data.errorMessage);
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
      setFeedbackText("Az eszk??z hozz??ad??sa sikertelen! T??ltse ki az ??sszes mez??t!");
      hitError(true);
    }
  }

  function fetchCatList() {
    fetch(serveraddress + '/category')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0 && data.categoryList !== undefined && data.categoryList !== null) {
        console.log("Sikeres lek??rdez??s :D");
        console.log(data.categoryList);

        setCategoryList(data.categoryList);

      } else {
        console.log("Sikertelen lek??rdez??s! :(");
        console.log(data.resultMessage);
        setFeedbackText("A kateg??ri??k lek??rdez??se sikertelen. " + data.resultMessage);
        hitError(true);
      }

      setCatListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
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
            <Typography variant="h5">??j eszk??z</Typography>
            <Divider />
            <Grid container spacing={2} sx={{ mt : 1 }}>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Eszk??z neve:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Eszk??z neve */}
                <TextField id="deviceName" label="N??v" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Eszk??z helye:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Eszk??z helye */}
                <TextField id="deviceLocation" label="Helysz??n" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/><br />
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Eszk??z kateg??ri??ja:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Eszk??z kateg??ri??ja */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="typeSelectControl" disabled={disabledTypeSelect}>
                  <InputLabel id="typeLabel">L??tez?? kateg??ria</InputLabel>
                  <Select labelId="typeLabel" id="typeSelect" value={type} onChange={typeChange} label="L??tez?? kateg??ria">
                    {categoryList !== undefined && categoryList.map((category, index) => (
                      <MenuItem value={category.categoryName} key={index}>{category.categoryName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Le??r??s:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  Eszk??z le??r??sa */}
                  <TextareaAutosize
                    id="deviceDescription"
                    minRows={3}
                    placeholder="Az eszk??z le??r??sa"
                    style={{ width: '100%' }}
                  />
              </Grid>

            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>M??gsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addDevice} fullWidth>Hozz??ad??s</Button>
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

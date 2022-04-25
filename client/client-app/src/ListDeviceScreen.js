import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { UserContext } from "./User.js";
import {serveraddress} from './Server.js';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListDeviceScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [deviceList, setDeviceList] = React.useState(["d"]);
  const [deviceListFetched, setDeviceListFetched] =  React.useState(false);

  function fetchDeviceList() {
    fetch(serveraddress + '/device')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.data);
        setDeviceList(data.data);
        setDeviceListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        //setFeedbackText("Az eszközök lekérdezése sikertelen. " + data.errorMessage);
        //hitError(true);
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

return(
  <Box
    component="main"
    sx={{ flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` }}}
  >
    <Toolbar />

    <Grid container spacing={2}>
      <Grid item xs={0} sm={0} lg={1}></Grid>

      <Grid item xs={12} sm={12} lg={10}>
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>
            <Typography variant="h5">Eszközök</Typography>
            <Divider  sx={{ mb : 2 }}/>

            {deviceList.map((device, index) => (
            <Accordion key={index} sx={{ backgroundColor : "#1976d2" , color : "white"}}>
              <AccordionSummary expandIcon={<ExpandMoreIcon  sx={{ color : "white" }} color="white"/>}>
              <EmojiObjectsIcon sx={{ mr : 2 }}/>
              <Typography>{device.deviceName}</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor : "white" , color : "black"}}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>ID:</Typography> {device.deviceID}
                    </p>

                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Kategória:</Typography> <Link to="/app/categories">{device.deviceCategoryName}</Link>
                    </p>
                  </Grid>

                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Eszköz leírása:</Typography> {device.deviceDescription}
                    </p>

                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Helyszín:</Typography> {device.deviceLocation}
                    </p>
                  </Grid>

              </Grid>
              </AccordionDetails>
            </Accordion>))}

          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={0} sm={0} lg={1}></Grid>
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

    <Fab color="primary" sx={{ position : 'fixed' , right : 16 , bottom : 16 }} component={Link} to="/app/newDevice">
      <AddIcon />
    </Fab>

  </Box>
);

}

export default ListDeviceScreen;

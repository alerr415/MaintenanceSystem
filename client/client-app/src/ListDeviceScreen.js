import * as React from 'react';
import { useState, useContext } from "react";
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
import { useCookies } from "react-cookie";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ListDeviceScreen(props) {

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
      <Grid item xs={0} sm={0} lg={1}></Grid>

      <Grid item xs={12} sm={12} lg={10}>
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>
            <Typography variant="h5">Eszközök</Typography>
            <Divider  sx={{ mb : 2 }}/>

            {['Tűzjelző', 'Poroltó', 'Kilincs', 'Pilács'].map((text, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{text}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
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

  </Box>
);

}

export default ListDeviceScreen;

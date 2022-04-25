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
//import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import EngineeringIcon from '@mui/icons-material/Engineering';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListMaintenanceWorker(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  //const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [workerList, setWorkerList] = React.useState(["d"]);
  const [workerListFetched, setWorkerListFetched] =  React.useState(false);

  function fetchWorkerList() {
    fetch(serveraddress + '/worker')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.data);
        setWorkerList(data.data);
        setWorkerListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        setFeedbackText(data.errorMessage);
        hitError(true);
      }

      setWorkerListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

  useEffect(() => {
    if (!workerListFetched) fetchWorkerList();
  });

return(
  <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }}}>
    <Toolbar />

    <Grid container spacing={2}>
      <Grid item xs={0} sm={0} lg={1}></Grid>

      <Grid item xs={12} sm={12} lg={10}>
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>
            <Typography variant="h5">Karbantartók</Typography>
            <Divider  sx={{ mb : 2 }}/>

            {workerList.map((worker, index) => (
            <Accordion key={index} sx={{ backgroundColor : "#1976d2" , color : "white"}} >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color : "white" }} color="white"/>}>
              <EngineeringIcon sx={{ mr : 2 }}/>
              <Typography>{worker.lastName} {worker.firstName}</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor : "white" , color : "black"}}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12} md={4} lg={5}>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Vezetéknév:</Typography> {worker.lastName}
                    </p>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Keresztnév:</Typography> {worker.firstName}
                    </p>
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={5}>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Képesítés:</Typography> {worker.qualificationID} TODO
                    </p>
                    {/*<p>
                      <Typography sx={{ fontWeight: "bold" }}>Felhasználónév:</Typography> TODO
                    </p>*/}
                  </Grid>

                  <Grid item xs={12} sm={12} md={4} lg={2}>
                    {/*  TODO <Button size="large" variant="contained" color="success" fullWidth>Szerkesztés</Button>*/}
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

    <Fab color="primary" sx={{ position : 'fixed' , right : 16 , bottom : 16 }} component={Link} to="/app/newWorker">
      <AddIcon />
    </Fab>

  </Box>
);

}

export default ListMaintenanceWorker;

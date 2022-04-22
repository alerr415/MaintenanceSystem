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
import Button from '@mui/material/Button';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListOperatorTask(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  //const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [taskList, setTaskList] = React.useState(["d"]);
  const [taskListFetched, setTaskListFetched] =  React.useState(false);

  function fetchTaskList() {
    fetch(serveraddress + '/maintenance')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.data);
        setTaskList(data.data);
        setTaskListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        setFeedbackText(data.errorMessage);
        hitError(true);
      }

      setTaskListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

  useEffect(() => {
    if (!taskListFetched) fetchTaskList();
  });

return(
  <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }}}>
    <Toolbar />

    <Grid container spacing={2}>
      <Grid item xs={0} sm={0} lg={1}></Grid>

      <Grid item xs={12} sm={12} lg={10}>
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>
            <Typography variant="h5">Karbantartási feladatok</Typography>
            <Divider  sx={{ mb : 2 }}/>

            {taskList.map((task, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{task.deviceName} - {task.maintenanceTaskName}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <p><Typography sx={{ fontWeight: "bold" }}>Érintett eszköz:</Typography> {task.deviceName} (#{task.deviceID})</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Helyszín:</Typography> {task.deviceLocation}</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Karbantartó:</Typography> {task.workerID}</p>

                  </Grid>

                  <Grid item xs={12} sm={12} md={7} lg={7}>
                    <p><Typography sx={{ fontWeight: "bold" }}>Megnevezés:</Typography> {task.maintenanceTaskName}</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Leírás:</Typography> &#34;{task.specification}&#34;</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Állapot:</Typography> {task.state}</p>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2} lg={2}>
                    <Button size="large" variant="contained" color="success" fullWidth>Ütemez</Button>
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

    <Fab color="primary" sx={{ position : 'fixed' , right : 16 , bottom : 16 }} component={Link} to="/app/newTask">
      <AddIcon />
    </Fab>

  </Box>
);

}

export default ListOperatorTask;

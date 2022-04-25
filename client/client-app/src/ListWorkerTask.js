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
import Button from '@mui/material/Button';
import { red, blue, teal, orange, lime, grey } from '@mui/material/colors';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListWorkerTask(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);

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
        //setFeedbackText(data.errorMessage);
        //hitError(true);
      }

      setTaskListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

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
        //setFeedbackText(data.errorMessage);
        //hitError(true);
      }

      //setWorkerListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

  const [declineDialogOpen, setDeclineDialogOpen] =  React.useState(false);

  const openDeclineReassure = () => {
    setDeclineDialogOpen(true);
  }

  const handleDeclineDialogClose = () => {
    setDeclineDialogOpen(false);
  }

  const cancelDecline = () => {
    // TODO
    setDeclineDialogOpen(false);
  }

  const reassureDecline = () => {
    // TODO
    setDeclineDialogOpen(false);
  }

  function getTaskColor(state) {
    if ( state === "0" || state === 0 ) {
      // utemezesre var
      return ({ backgroundColor : red[500] , color : "white" });

    } else if ( state === "1" || state === 1 ) {
      // utemezve
      return ({ backgroundColor : orange[500] , color : "white" });

    } else if ( state === "2" || state === 2 ) {
      // elfogadva
      return ({ backgroundColor : teal[100] });

    } else if ( state === "3" || state === 3 ) {
      // elutasitva
      return ({ backgroundColor : red[500] , color : "white" });

    } else if ( state === "4" || state === 4 ) {
      // megkezdve
      return ({ backgroundColor : lime[100] });

    } else if ( state === "5" || state === 5 ) {
      // befejezve
      return ({ backgroundColor : grey[100] });
    }
  }

  function resolveStateNames(state) {
    if ( state === "0" || state === 0 ) {
      // utemezesre var
      return "Ütemezésre vár";

    } else if ( state === "1" || state === 1 ) {
      // utemezve
      return "Ütemezve";

    } else if ( state === "2" || state === 2 ) {
      // elfogadva
      return "Elfogadva";

    } else if ( state === "3" || state === 3 ) {
      // elutasitva
      return "Elutasítva";

    } else if ( state === "4" || state === 4 ) {
      // megkezdve
      return "Megkezdve";

    } else if ( state === "5" || state === 5 ) {
      // befejezve
      return "Befejezve";
    }
  }

  function ownTask(task) {
    //console.log("selfID:" + user.workerID);
    //console.log("workerID:" + task.workerID);
    //if (task.workerID === user.workerID) console.log("HOPPÁ!");
    return (task.workerID === user.workerID);
  }

  function resolveWorkerNames(id) {
    //let currentWorker = workerList.find((worker) => {return worker.id == id});
    //if (currentWorker !== undefined) {
    //  return currentWorker.lastName.concat(currentWorker.firstName);
    //}
    return "TODO";
  }

  useEffect(() => {
    if (!taskListFetched) fetchTaskList();
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
            <Typography variant="h5">Saját feladataim</Typography>
            <Divider  sx={{ mb : 2 }}/>

            {taskList.filter(ownTask).map((task, index) => (
            <Accordion key={index} sx={getTaskColor(task.state)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color : "white" }} color="white"/>}>
              <Typography>{task.deviceName} - {task.maintenanceTaskName}</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor : "white" , color : "black"}}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <p><Typography sx={{ fontWeight: "bold" }}>Érintett eszköz:</Typography> {task.deviceName} (#{task.deviceID})</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Helyszín:</Typography> {task.deviceLocation}</p>
                  </Grid>

                  <Grid item xs={12} sm={12} md={7} lg={7}>
                    <p><Typography sx={{ fontWeight: "bold" }}>Megnevezés:</Typography> {task.maintenanceTaskName}</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Leírás:</Typography> &#34;{task.specification}&#34;</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Állapot:</Typography> {resolveStateNames(task.state)}</p>
                  </Grid>

                  {(task.state === 1 || task.state === "1") &&
                    // ha ütemezett állapotban van
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                      <Button size="large" variant="contained" color="success" fullWidth>Elfogad</Button>
                      <Button size="large" variant="outlined" color="error" onClick={openDeclineReassure} fullWidth>Elutasít</Button>
                    </Grid>
                  }

                  <Dialog open={declineDialogOpen} onClose={handleDeclineDialogClose}>
                    <DialogTitle>Elutasítás</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Ha valóban el kívánja utasítani a feladatot, adja meg az elutasítás indoklását!
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="reason"
                        label="Indok"
                        type="text"
                        required
                        fullWidth
                        variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={cancelDecline}>Mégsem</Button>
                      <Button onClick={reassureDecline}>Elutasítás</Button>
                    </DialogActions>
                  </Dialog>


                  {(task.state === 2 || task.state === "2") &&
                    // ha elfogadott állapotban van
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                      <Button size="large" variant="contained" color="success" fullWidth>Kezdés</Button>
                    </Grid>
                  }


                  {(task.state === 4 || task.state === "4") &&
                    // ha megkezdett állapotban van
                    <>
                      <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Button size="large" variant="contained" color="success" fullWidth>Befejezés</Button>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <p><Typography sx={{ fontWeight: "bold" }}>Előírás:</Typography> {task.specification} TODO !!! </p>
                      </Grid>
                    </>
                  }

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

  </Box>
);

}

export default ListWorkerTask;

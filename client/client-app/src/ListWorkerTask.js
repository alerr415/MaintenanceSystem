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
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();

  const {user, setUser} = useContext(UserContext);

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [taskList, setTaskList] = React.useState(undefined);
  const [taskListFetched, setTaskListFetched] =  React.useState(false);

  function fetchTaskList() {
    fetch(serveraddress + '/maintenance')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0 && data.data !== undefined && data.data !== null) {
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

  const [workerList, setWorkerList] = React.useState(undefined);
  const [workerListFetched, setWorkerListFetched] =  React.useState(false);

  function fetchWorkerList() {
    fetch(serveraddress + '/worker')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0 && data.data !== undefined && data.data !== null) {
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

      setWorkerListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };


  const [deviceList, setDeviceList] = React.useState(undefined);
  const [deviceListFetched, setDeviceListFetched] =  React.useState(false);

  function fetchDeviceList() {
    fetch(serveraddress + '/device')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.errorCode === 0 && data.data !== undefined && data.data !== null) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.data);

        setDeviceList(data.data);
        setDeviceListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        //setFeedbackText(data.errorMessage);
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

  const [categoryList, setCategoryList] = React.useState(undefined);
  const [categoryListFetched, setCategoryListFetched] =  React.useState(false);

  function fetchCategoryList() {
    fetch(serveraddress + '/category')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0 && data.categoryList !== undefined && data.categoryList !== null) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.categoryList);
        setCategoryList(data.categoryList);
        setCategoryListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.resultMessage);
        //setFeedbackText(data.resultMessage);
        //hitError(true);
      }

      setCategoryListFetched(true);

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

  const reassureDecline = (task) => {

    console.log("STATECHANGE(DENY):");
    console.log(task);
    let reason = document.getElementById('reason').value;
    console.log("REASON");
    console.log(reason);

    if (task !== undefined && task !== "") {

      let toSend  = {"maintenanceID" : task.maintenanceTaskID,
                     "state" : "3",
                     "denialJustification" : reason
                    }

      console.log(toSend);

      fetch(serveraddress + '/state', {
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

          console.log("Sikeres Hozzáadás :D ");
          setFeedbackText("A feladat elutasítása sikeresen megtörtént!");
          hitSuccess(true);
          setDeclineDialogOpen(false);
          document.getElementById('reason').value = "";

          navigate("/app/scheduleDone");

        } else {
          console.log("Sikertelen Hozzáadás! :( ");
          console.log(data.errorMessage);

          setFeedbackText("A feladat elutasítása sikertelen! " + data.errorMessage);
          hitError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
        hitError(true);
      });
  }
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
    if (task !== undefined && task !== null && task.workerID !== undefined && user.workerID !== undefined) {
      return (task.workerID === user.workerID);
    }
  }

  function resolveWorkerNames(id) {
    return "TODO";
  }

  function getTaskDescription(task) {
    if (task !== undefined && task !== null && task !== "") {
      let deviceID = task.deviceID;
      let category = "";
      console.log("DEVICE:" + deviceID);
      console.log("CAT:" + category);

      if(deviceID !== undefined && deviceID !== null && deviceList !== undefined && deviceList !== null) {

        console.log("devicelist");
        console.log(deviceList);

        for (var i = 0; i < deviceList.length; i++) {
          if (deviceList[i].deviceID.toString() === deviceID.toString()) {
            category = deviceList[i].deviceCategoryName;
            console.log("DEVICE:" + deviceID + deviceList[i].deviceName);
            console.log("CAT:" + deviceList[i].deviceCategoryName);
            console.log(" '--> cat:" + category);
          }
        }

        if(category !== undefined && category !== null && categoryList !== undefined && categoryList !== null) {

          console.log("categorylist");
          console.log(categoryList);

          for (var i = 0; i < categoryList.length; i++) {
            if (categoryList[i].categoryName.toString() === category.toString()) {
              console.log("FINALLY");
              console.log("DEVICE:" + deviceID);
              console.log("CAT:" + category);
              console.log("DESC:" + categoryList[i].stepsDescription);
              return categoryList[i].stepsDescription;
            }
          }

        }

      }
    }
  }

  const acceptTask = (task) => {
    console.log("STATECHANGE(ACCEPT):");
    console.log(task);

    if (task !== undefined && task !== null && task !== "") {

      let toSend  = {"maintenanceID" : task.maintenanceTaskID,
                     "state" : "2",
                     "denialJustification" : null
                    }

      console.log(toSend);

      fetch(serveraddress + '/state', {
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

          console.log("Sikeres Hozzáadás :D ");
          setFeedbackText("A feladat elfogadása sikeresen megtörtént!");
          hitSuccess(true);

          navigate("/app/scheduleDone");

        } else {
          console.log("Sikertelen Hozzáadás! :( ");
          console.log(data.errorMessage);

          setFeedbackText("A feladat elfogadása sikertelen! " + data.errorMessage);
          hitError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
        hitError(true);
      });
  }
}

const startTask = (task) => {
  console.log("STATECHANGE(START):");
  console.log(task);

  if (task !== undefined && task !== null && task !== "") {

    let toSend  = {"maintenanceID" : task.maintenanceTaskID,
                   "state" : "4",
                   "denialJustification" : null
                  }

    console.log(toSend);

    fetch(serveraddress + '/state', {
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

        console.log("Sikeres Hozzáadás :D ");
        setFeedbackText("A feladat megkezdése sikeresen megtörtént!");
        hitSuccess(true);

        navigate("/app/scheduleDone");

      } else {
        console.log("Sikertelen Hozzáadás! :( ");
        console.log(data.errorMessage);

        setFeedbackText("A feladat megkezdése sikertelen! " + data.errorMessage);
        hitError(true);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  }
}

const endTask = (task) => {
  console.log("STATECHANGE(END):");
  console.log(task);

  if (task !== undefined && task !== null && task !== "") {

    let toSend  = {"maintenanceID" : task.maintenanceTaskID,
                   "state" : "5",
                   "denialJustification" : null
                  }

    console.log(toSend);

    fetch(serveraddress + '/state', {
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

        console.log("Sikeres Hozzáadás :D ");
        setFeedbackText("A feladat befejezése sikeresen megtörtént!");
        hitSuccess(true);

        navigate("/app/scheduleDone");

      } else {
        console.log("Sikertelen Hozzáadás! :( ");
        console.log(data.errorMessage);

        setFeedbackText("A feladat befejezése sikertelen! " + data.errorMessage);
        hitError(true);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  }
}

  useEffect(() => {
    if (!taskListFetched) fetchTaskList();
    if (!workerListFetched) fetchWorkerList();
    if (!deviceListFetched) fetchDeviceList();
    if (!categoryListFetched) fetchCategoryList();
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

            {taskList !== undefined && taskList.filter(ownTask).map((task, index) => (
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
                      <Button size="large" color="success" onClick={() => {acceptTask(task)}} fullWidth>Elfogad</Button>
                      <Button size="large" color="error" onClick={openDeclineReassure} fullWidth>Elutasít</Button>
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
                      <Button color="success" onClick={cancelDecline}>Mégsem</Button>
                      <Button color="error" onClick={() => {reassureDecline(task)}}>Elutasítás</Button>
                    </DialogActions>
                  </Dialog>


                  {(task.state === 2 || task.state === "2") &&
                    // ha elfogadott állapotban van
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                      <Button size="large" color="success" onClick={() => {startTask(task)}} fullWidth>Kezdés</Button>
                    </Grid>
                  }


                  {(task.state === 4 || task.state === "4") &&
                    // ha megkezdett állapotban van
                    <>
                      <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Button size="large" color="success" onClick={() => {endTask(task)}} fullWidth>Befejezés</Button>
                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <p><Typography sx={{ fontWeight: "bold" }}>Előírás:</Typography> {getTaskDescription(task)} </p>
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

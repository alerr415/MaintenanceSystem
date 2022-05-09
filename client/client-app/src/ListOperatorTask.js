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
import { red, blue, teal, orange, lime, grey, green } from '@mui/material/colors';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { useNavigate } from "react-router-dom";

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListOperatorTask(props) {

  const { window } = props;
  let navigate = useNavigate();

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

  const [workerList, setWorkerList] = React.useState(["d"]);
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

  function getTaskColor(state) {
    if ( state === "0" || state === 0 ) {
      // utemezesre var
      return ({ backgroundColor : red[500] , color : "white" });

    } else if ( state === "1" || state === 1 ) {
      // utemezve
      return ({ backgroundColor : orange[100] });

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

  function givePriority(task) {
    if (task.state === "0") {
      // utemezesre var
      task.priority = 5;
    }
    else if (task.state === "1") {
      // utemezve
      task.priority = 3;
    }
    else if (task.state === "2") {
      // elfogadva
      task.priority = 2;
    }
    else if (task.state === "3") {
      // elutasitva
      task.priority = 4;
    }
    else if (task.state === "4") {
      // megkezdve
      task.priority = 1;
    }
    else {
      // befejezve vagy hibás
      task.priority = 0;
    }
  }

  const [scheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);
  const [openTask, setOpenTask] = React.useState('');

  const handleScheduleButton = (task) => {
    if (openTask === '' && !scheduleDialogOpen) {
      console.log("PUKK");
      setOpenTask(task);
      setScheduleDialogOpen(true);
    }
  };

  const handleScheduleDialogClose = () => {
    setOpenTask('');
    setScheduleDialogOpen(false);
  };

  const [workerToSchedule, setWorkerToSchedule] = React.useState('');

  const workerSelectChange = (event) => {
    setWorkerToSchedule(event.target.value);
  };

  useEffect(() => {
    if (!taskListFetched) fetchTaskList();
    if (!workerListFetched) fetchWorkerList();
  });

  function workerGreen(have, needed) {
    if (have !== undefined && have !== null && needed !== undefined && needed !== null) {
      if (have.toString() === needed.toString()) {
        return ( { backgroundColor : green[200]} );
      }
    }
  };

  const schedule = () => {
    console.log("ASSIGN:");
    console.log(openTask);

    if (openTask !== undefined && workerToSchedule !== undefined && openTask !== "" && workerToSchedule !== "") {

      let toSend  = {"maintenanceID" : openTask.maintenanceTaskID,
                     "workerID" : workerToSchedule }

      console.log(toSend);

      fetch(serveraddress + '/assign', {
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

          console.log("Sikeres Hozzárendelés :D");

          console.log("STATECHANGE:");
          console.log(openTask);

          if (openTask !== undefined && openTask !== "") {

            let toSend  = {"maintenanceID" : openTask.maintenanceTaskID,
                           "state" : "1",
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
                setFeedbackText("A karbantartó hozzárendelése megtörtént!");
                hitSuccess(true);
                setScheduleDialogOpen(false);
                navigate("/app/scheduleDone");

              } else {
                console.log("Sikertelen Hozzáadás! :( ");
                console.log(data.errorMessage);

                setFeedbackText("A karbantartás hozzárendelése sikertelen! " + data.errorMessage);
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
            setFeedbackText("Az hozzárendelés sikertelen! Próbálja újra!");
            hitError(true);
          }


        } else {
          console.log("Sikertelen Hozzáadás! :(");
          console.log(data.errorMessage);

          setFeedbackText("A karbantartás hozzárendelése sikertelen! " + data.errorMessage);
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
      setFeedbackText("Az hozzárendelés sikertelen! Próbálja újra!");
      hitError(true);
    }
  }

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
            <Accordion key={index} sx={getTaskColor(task.state)}>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color : "white" }} color="white"/>}>
                <Typography>{task.deviceName} - {task.maintenanceTaskName}</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor : "white" , color : "black"}}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12} md={3} lg={3}>
                    <p><Typography sx={{ fontWeight: "bold" }}>Érintett eszköz:</Typography> {task.deviceName} (#{task.deviceID})</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Helyszín:</Typography> {task.deviceLocation}</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Karbantartó:</Typography> {task.workerFullName !== null && task.workerFullName} </p>

                  </Grid>

                  <Grid item xs={12} sm={12} md={7} lg={7}>
                    <p><Typography sx={{ fontWeight: "bold" }}>Megnevezés:</Typography> {task.maintenanceTaskName}</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Leírás:</Typography> &#34;{task.specification}&#34;</p>
                    <p><Typography sx={{ fontWeight: "bold" }}>Állapot:</Typography> {resolveStateNames(task.state)}</p>
                  </Grid>

                  {(task.state === 0 || task.state === "0" || task.state === 3 || task.state === "3") &&
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                      <Button size="large" variant="contained" color="success" onClick={() => {handleScheduleButton(task)}} fullWidth>Ütemez</Button>
                        <div>
                          <Dialog open={scheduleDialogOpen} onClose={handleScheduleDialogClose} >

                            <DialogTitle> Ütemezés </DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                A kiválasztott feladat ütemezéséhez válassza ki a hozzárendelni kivánt karbantartót!
                              </DialogContentText>

                              <FormControl sx={{ mx : 'auto' , mt : 2 ,  width : 1 }}>

                                <InputLabel id="selectWorkerLabel">Karbantartó</InputLabel>
                                <Select labelId="selectWorkerLabel" id="workerSelect" value={workerToSchedule} onChange={workerSelectChange} label="Karbantartó">
                                  {workerList.map((worker, index) => (
                                    <MenuItem value={worker.workerID} sx={ workerGreen(worker.qualificationID, openTask.qualificationID) } key={index}>{worker.lastName} {worker.firstName}</MenuItem>
                                  ))}
                                </Select>

                              </FormControl>

                            </DialogContent>

                            <DialogActions>
                              <Button onClick={handleScheduleDialogClose}>Mégse</Button>
                              <Button onClick={schedule}>Hozzárendelés</Button>
                            </DialogActions>

                          </Dialog>
                        </div>

                    </Grid>
                  }

                  {task.state === 3 || task.state === "3" &&
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <p><Typography sx={{ fontWeight: "bold" }}>Elutasítás indoklása:</Typography> {task.maintenanceTaskName}</p>

                    </Grid>
                  }

                </Grid>

              </AccordionDetails>
            </Accordion> ))}

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

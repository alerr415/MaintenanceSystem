import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {serveraddress} from './Server.js';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import * as React from "react";
import { useContext } from "react";
import { UserContext } from "./User.js";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

function Login() {

  const {user, setUser} = useContext(UserContext);

  const [error, hitError] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const navigate = useNavigate();

  function submit() {
    const toSend = {
    "username": document.getElementById("username").value,
    "password": document.getElementById("password").value
  };

    console.log(toSend);
    console.log(serveraddress+'/authenticate');
    setUser('login');
    console.log(user);

    fetch(serveraddress + '/authenticate', {
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
        console.log("Helyes jelszó");
        console.log("User:" + toSend.username);
        console.log("Pw:" + toSend.password);
        console.log("Role:" + data.role);

        if (data.role === "karbantarto") {
          setUser({
            username : toSend.username,
            password : toSend.password,
            role : data.role,
            workerID : data.workerId
          });
        } else {
          setUser({
            username : toSend.username,
            password : toSend.password,
            role : data.role
          });
        }

        setTimeout(() => {
          document.getElementById('bulb').style.color = "yellow";
        }, 500);
        setTimeout(() => {navigate("/app/welcome")}, 1000);

      } else {
        console.log("Hibás jelszó");
        setFeedbackText("Hibás jelszó!");
        hitError(true);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  }



  return (
    <>
    <div style={{ width : "100%" , textAlign : "center" , mt : 2 , mb : 2 }}>
      <EmojiObjectsIcon sx={{ fontSize : "7rem" , transition : "color .1s" , mx : "auto"}} id="bulb"/>
    </div>
    <Grid container spacing={2}>
      <Grid item xs={0} sm={2} lg={4}></Grid>
      <Grid item xs={12} sm={8} lg={4}>
        <Card sx={{ mx : "auto", p : 2, textAlign: 'center'}}>

          <CardMedia>
              <Typography variant="h4"></Typography>
              <Typography variant="h4">Karbantartási<br />Rendszer</Typography>
          </CardMedia>

          <CardContent>
            <Typography variant="h5">Bejelentkezés</Typography>

            <TextField id="username" label="Felhasználónév" InputProps={{startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>),}} variant="outlined" sx={{ mt : 4 }} fullWidth/><br />
            <TextField id="password" label="Jelszó" InputProps={{startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),}} type="password"  sx={{ mt : 4 }} fullWidth/>
          </CardContent>

          <CardActions>
            <Button size="large" variant="contained" color="success" fullWidth onClick={submit}>Bejelentkezés</Button>

          </CardActions>

        </Card>
      </Grid>
      <Grid item xs={0} sm={2} lg={4}></Grid>
    </Grid>

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

    </>
  );

}

export default Login;

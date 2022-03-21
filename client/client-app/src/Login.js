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

function Login() {

  const {user, setUser} = useContext(UserContext);

  function submit() {
    const tosend = {
    "username": document.getElementById("username").value,
    "password": document.getElementById("password").value
  };

    console.log(tosend);
    console.log(serveraddress+'/login');
    setUser('login');
    console.log(user);

    fetch(serveraddress + '/login', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tosend),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      if (data.errorCode === 0) {
        console.log("Helyes jelszó");
        console.log("User:" + tosend.username);
        console.log("Pw:" + tosend.password);
        console.log("Role:" + data.role);

        setUser({
          username : tosend.username,
          password : tosend.password,
          role : data.role
        });
        console.log(user);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }



  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={0} sm={2} lg={4}></Grid>
      <Grid item xs={12} sm={8} lg={4}>
        <Card sx={{ mt : 8 , mx : "auto", p : 2, textAlign: 'center'}}>

          <CardMedia>
              <Typography variant="h3">Karbantartási<br />Rendszer</Typography>
          </CardMedia>

          <CardContent>
            <Typography variant="h5">Bejelentkezés</Typography>
            {JSON.stringify(user)}
            <TextField id="username" label="Felhasználónév" InputProps={{startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>),}} variant="outlined" fullWidth/><br />
            <TextField id="password" label="Jelszó" InputProps={{startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),}} type="password"  sx={{ mt : 4 }} fullWidth/>
          </CardContent>

          <CardActions>
            <Button size="large" variant="contained" color="success" fullWidth onClick={submit}>Bejelentkezés</Button>
          </CardActions>

        </Card>
      </Grid>
      <Grid item xs={0} sm={2} lg={4}></Grid>
    </Grid>
    </>
  );

}

export default Login;

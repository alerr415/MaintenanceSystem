import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { blue } from '@mui/material/colors';
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



function submit() {
  const data = {
  "username": document.getElementById("username").value,
  "password": document.getElementById("password").value
};

  console.log(data);
  console.log(serveraddress+'/login');

  fetch(serveraddress + '/login', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function Login() {

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={0} sm={2} lg={4}></Grid>
      <Grid item xs={12} sm={8} lg={4}>
        <Card sx={{ mt : 8 , mx : "auto", p : 2, textAlign: 'center'}}>

          <CardMedia>
              <Typography variant="h3">Maintenance<br />System</Typography>
          </CardMedia>

          <CardContent>
            <Typography variant="h5">Sign in</Typography>
            <TextField id="username" label="Username" InputProps={{startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>),}} variant="outlined" fullWidth/><br />
            <TextField id="password" label="Password" InputProps={{startAdornment: (<InputAdornment position="start"><LockIcon /></InputAdornment>),}} type="password"  sx={{ mt : 4 }} fullWidth/>
          </CardContent>

          <CardActions>
            <Button size="large" variant="contained" color="success" fullWidth onClick={submit}>Sign in</Button>
          </CardActions>

        </Card>
      </Grid>
      <Grid item xs={0} sm={2} lg={4}></Grid>
    </Grid>
    </>
  );

}

export default Login;

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {serveraddress} from './Server.js';

function submit() {
  const data = {
  "username": document.getElementById("username").value,
  "password": document.getElementById("password").value
};

  console.log(data);

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
        <Card sx={{ mt : 16 , mx : "auto", p : 2, textAlign: 'center'}}>


          <CardContent>


            <h1 variant="h1">Maintenance System</h1>
            <h5 variant="h5">Please fill the fields to login.</h5>
            <TextField id="username" label="Username" variant="outlined" fullWidth/><br />
            <TextField id="password" label="Password" type="password"  sx={{ mt : 4 }} fullWidth/>


          </CardContent>

          <CardActions>
            <Button size="large" variant="contained" color="success" fullWidth onClick={submit}>Log me in!</Button>
          </CardActions>


        </Card>
      </Grid>
      <Grid item xs={0} sm={2} lg={4}></Grid>
    </Grid>
    </>
  );

}

export default Login;

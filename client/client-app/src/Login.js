import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {serveraddress} from './Server.js';

function submit() {
  const data = { username: 'example' };

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
      <Grid item xs={2} md={4}></Grid>
      <Grid item xs={8} md={4}>
        <Card sx={{ mt : 8 , mx : "auto"}}>
          <CardContent>
            <h1>Maintenance System</h1>
            <h5>Please fill the fields to login.</h5>
            <TextField id="username" label="Username" variant="outlined" /><br />
            <TextField id="password" label="Password" type="password"/>
          </CardContent>
          <CardActions>
            <Button size="large" variant="contained" color="success" onClick={submit}>Log me in!</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={2} md={4}></Grid>
    </Grid>
    </>
  );

}

export default Login;

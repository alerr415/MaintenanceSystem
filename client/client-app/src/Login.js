import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Login() {
  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={2} md={4}></Grid>
      <Grid item xs={8} md={4}>
        <Card sx={{ mt : 8 , mx : "auto"}}>
          <CardContent>
            <h2>Maintenance System</h2>
            <h3>Please fill the fields to login.</h3>
          </CardContent>
          <CardActions>
            <Button size="medium">Log me in!</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={2} md={4}></Grid>
    </Grid>
    </>
  );

}

export default Login;

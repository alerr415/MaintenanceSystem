import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { UserContext } from "./User.js";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import {serveraddress} from './Server.js';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useCookies } from "react-cookie";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListDeviceScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  const [cookies, setCookie] = useCookies();

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [categoryList, setCategoryList] = React.useState(["d"]);
  const [listFetched, setListFetched] =  React.useState(false);

  function fetchList() {
    fetch(serveraddress + '/category')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.categoryList);

        setCategoryList(data.categoryList);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.errorMessage);
        hitError(true);
      }

      setListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

  useEffect(() => {
    if (!listFetched) fetchList();
  });

return(
  <Box
    component="main"
    sx={{ flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - 240px)` }}}
  >
    <Toolbar />

    <Grid container spacing={2}>
      <Grid item xs={0} sm={0} lg={1}></Grid>

      <Grid item xs={12} sm={12} lg={10}>
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>
            <Typography variant="h5">Kategóriák</Typography>
            <Divider  sx={{ mb : 2 }}/>

            {categoryList.map((category, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{category}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
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

    <Fab color="primary" sx={{ position : 'fixed' , right : 16 , bottom : 16 }}>
      <AddIcon />
    </Fab>

  </Box>
);

}

export default ListDeviceScreen;

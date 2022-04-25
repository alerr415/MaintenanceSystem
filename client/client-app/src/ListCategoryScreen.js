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
//import { useCookies } from "react-cookie";
import { Link } from 'react-router-dom';


import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassIcon from '@mui/icons-material/Class';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

function ListCategoryScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);
  //const [cookies, setCookie] = useCookies();

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
        console.log(data.resultMessage);
        //setFeedbackText("A kategóriák lekérdezése sikertelen. " + data.resultMessage);
        //hitError(true);
      }

      //setListFetched(true);

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
            <Accordion key={index} sx={{ backgroundColor : "#1976d2" , color : "white"}} >
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color : "white" }} color="white"/>}>
              <ClassIcon sx={{ mr : 2 }}/>
              <Typography>{category.categoryName}</Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ backgroundColor : "white" , color : "black"}}>
                <Grid container spacing={2}>

                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Normaidő:</Typography> {category.normTime}
                    </p>
                    <p>
                      <Typography sx={{ fontWeight: "bold" }}>Periódikus karbantartás:</Typography> {category.period}
                    </p>
                  </Grid>

                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    { category.parent !== null &&
                      <p>
                        <Typography sx={{ fontWeight: "bold" }}>Szülő:</Typography> {category.parent}
                      </p>
                    }
                  </Grid>

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

    <Fab color="primary" sx={{ position : 'fixed' , right : 16 , bottom : 16 }} component={Link} to="/app/newCategory">
      <AddIcon />
    </Fab>

  </Box>
);

}

export default ListCategoryScreen;

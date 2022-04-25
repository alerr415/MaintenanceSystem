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
//import InputAdornment from '@mui/material/InputAdornment';

function AddCategoryScreen(props) {

  const { window } = props;

  const {user, setUser} = useContext(UserContext);

  const [error, hitError] = React.useState(false);
  const [success, hitSuccess] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState(false);

  const [qualSelectValue, setQualSelectValue] = React.useState('');

  const qualChange = (event) => {
    setQualSelectValue(event.target.value);
  };

  const [categoryPeriod, setCategoryPeriod] = React.useState('');

  const periodChange = (event) => {
    setCategoryPeriod(event.target.value);
  };

  const [parent, setParent] = React.useState('');

  const parentChange = (event) => {
    setParent(event.target.value);
  };

  const [categoryList, setCategoryList] = React.useState(["d"]);
  const [catListFetched, setCatListFetched] =  React.useState(false);

  const [qualificationList, setQualificationList] = React.useState(["d"]);
  const [qualListFetched, setQualListFetched] =  React.useState(false);
  const [disabledQualSelect, setDisabledQualSelect] =  React.useState(false);

  const handleQualificationAddingCell = (event) => {
    console.log("CHANGE");
    if (event.target.value !== "") {
      console.log("NOTEMPTY");
      setDisabledQualSelect(true);

    } else {
      console.log("EMPTY");
      setDisabledQualSelect(false);

    }
  };

  function clearForm() {

    document.getElementById("categoryName").value = "";
    setQualSelectValue('');
    document.getElementById("qualificationAddingCell").value = "";
    setCategoryPeriod('');
    document.getElementById("categoryNormalTime").value = "";
    document.getElementById("specification").value = "";
    setParent('');

  };


  const addCategory = () => {

    let categoryName = document.getElementById("categoryName").value;
    let categoryNormalTime = document.getElementById("categoryNormalTime").value;
    let specification = document.getElementById("specification").value;

    let qualification = "";
    if (document.getElementById("qualificationAddingCell").value !== "") {
      qualification = document.getElementById("qualificationAddingCell").value;
    } else {
      qualification = qualSelectValue;
    }


    if (categoryName !== "" && qualification !== "") {
      let toSend  = {"categoryName" : categoryName,
                     "qualification" : qualification,
                     "categoryPeriod" : categoryPeriod,
                     "categoryNormalTime" : categoryNormalTime,
                     "specification" : specification,
                     "parent" : parent}

      console.log(toSend);

      fetch(serveraddress + '/category', {
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
          console.log("Sikeres Hozzáadás :D");
          setFeedbackText("A kategória hozzáadása megtörtént!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozzáadás! :(");
          console.log(data.errorMessage);
          setFeedbackText("A kategória hozzáadása sikertelen!");
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
      setFeedbackText("Az eszköz hozzáadása sikertelen! Töltse ki az összes mezőt!");
      hitError(true);
    }
  };

  function fetchCatList() {
    fetch(serveraddress + '/category')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.categoryList);

        setCategoryList(data.categoryList);
        setCatListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.resultMessage);
        //setFeedbackText("A kategóriák lekérdezése sikertelen. " + data.resultMessage);
        //hitError(true);
      }

      //setCatListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

  function fetchQualList() {
    fetch(serveraddress + '/qualification')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0) {
        console.log("Sikeres lekérdezés :D");
        console.log(data.qualificationList);

        setQualificationList(data.qualificationList);
        setQualListFetched(true);

      } else {
        console.log("Sikertelen lekérdezés! :(");
        console.log(data.resultMessage);
        //setFeedbackText("A képesítések lekérdezése sikertelen. " + data.resultMessage);
        //hitError(true);
      }

      //setQualListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba történt a szerverhez való csatlakozásban!");
      hitError(true);
    });
  };

  useEffect(() => {
    if (!catListFetched) fetchCatList();
    if (!qualListFetched) fetchQualList();
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
      <Grid item xs={0} sm={0} lg={3}></Grid>

      <Grid item xs={12} sm={12} lg={6}>
        <Card sx={{ mt: { xs : 0 , lg : 4 } }}>
          <CardContent>

            <Typography variant="h5">Új kategória</Typography>
            <Divider />

            <Grid container spacing={2} sx={{ mt : 1 }}>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Kategória megnevezése:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  kategória neve */}
                <TextField id="categoryName" label="Név" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/>
              </Grid>


                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>* Elvárt képesítés:</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  {/* Képesítés */}
                  <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="qualSelectControl" disabled={disabledQualSelect}>
                    <InputLabel id="qualLabel">Képesítés</InputLabel>
                    <Select labelId="qualLabel" id="qualSelect" value={qualSelectValue} onChange={qualChange} label="Képesítés">
                      {qualificationList.map((qualification, index) => (
                        <MenuItem value={qualification.qualificationID} key={index}>{qualification.qualificationName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography sx={{ mt : 2 , width : 1 , textAlign : 'center' }}>VAGY</Typography>
                  <TextField id="qualificationAddingCell" label="Új képesítés" sx={{ mx : 'auto' , width : 1 , mt : 2}} variant="outlined" onChange={handleQualificationAddingCell}/><br />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>Rendszeres karbantartás:</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* periódusidő */}
                  <FormControl sx={{ mx : 'auto' , width : 1 }}>
                    <InputLabel id="periodLabel">Periódus</InputLabel>
                    <Select labelId="periodLabel" id="periodSelect" value={categoryPeriod} onChange={periodChange} label="Periódus">
                      <MenuItem value={''}>nincs</MenuItem>
                      <MenuItem value={'eves'}>Éves</MenuItem>
                      <MenuItem value={'feleves'}>Féléves</MenuItem>
                      <MenuItem value={'negyedeves'}>Negyedéves</MenuItem>
                      <MenuItem value={'havi'}>Havi</MenuItem>
                      <MenuItem value={'heti'}>Heti</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>Karbantartás normaideje (óra):</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/*  normaidő */}
                  <TextField id="categoryNormalTime"
                             label="Normaidő"
                             sx={{ mx : 'auto' , width : 1 }}
                             variant="outlined"
                             inputProps={{ inputMode: 'numeric',
                                           pattern: '[0-9]*' }}
                             />
                           <br />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>Kategória leírása:</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* specification */}
                    <TextareaAutosize
                      id="specification"
                      minRows={3}
                      placeholder="A kategória leírása és karbantartási utasításai"
                      style={{ width: '100%' }}
                    />
                </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Alkategória kategóriája:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* parent */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }}>
                  <InputLabel id="parentLabel">Szülő kategória</InputLabel>
                  <Select labelId="parentLabel" id="parentSelect" value={parent} onChange={parentChange} label="Szülő kategória">
                    {categoryList.map((category, index) => (
                      <MenuItem value={category} key={index}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>Mégsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addCategory} fullWidth>Hozzáadás</Button>
              </Grid>
            </Grid>
          </CardActions>

        </Card>
      </Grid>

      <Grid item xs={0} sm={0} lg={3}></Grid>

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

export default AddCategoryScreen;

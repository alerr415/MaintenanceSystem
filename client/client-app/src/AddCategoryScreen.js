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

  const [categoryList, setCategoryList] = React.useState();
  const [catListFetched, setCatListFetched] =  React.useState(false);

  const [qualificationList, setQualificationList] = React.useState();
  const [qualListFetched, setQualListFetched] =  React.useState(false);

  function clearForm() {

    document.getElementById("categoryName").value = "";
    setQualSelectValue('');
    setCategoryPeriod('');
    document.getElementById("categoryNormalTime").value = "";
    document.getElementById("specification").value = "";
    setParent('');

  };


  const addCategory = () => {

    let categoryName = document.getElementById("categoryName").value;
    let categoryNormalTime = document.getElementById("categoryNormalTime").value;
    let specification = document.getElementById("specification").value;

    let qualification = qualSelectValue;

    if (categoryName !== "" && qualification !== "" && categoryPeriod !== "" && categoryNormalTime !== "" && specification !== "") {
      let toSend  = {"categoryName" : categoryName,
                     "qualificationID" : qualification.toString() ,
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
          console.log("Sikeres Hozz??ad??s :D");
          setFeedbackText("A kateg??ria hozz??ad??sa megt??rt??nt!");
          hitSuccess(true);

          clearForm();

        } else {
          console.log("Sikertelen Hozz??ad??s! :(");
          console.log(data.errorMessage);
          setFeedbackText("A kateg??ria hozz??ad??sa sikertelen!");
          hitError(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
        hitError(true);
      });

    } else { // ha valamelyik adat hi??nyzik
      console.log("Sikertelen Hozz??ad??s! :(");
      console.log("valamelyik mez?? ??resen maradt");
      setFeedbackText("Az eszk??z hozz??ad??sa sikertelen! T??ltse ki az ??sszes mez??t!");
      hitError(true);
    }
  };

  function fetchCatList() {
    fetch(serveraddress + '/category')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0 && data.categoryList !== undefined && data.categoryList !== null) {
        console.log("Sikeres lek??rdez??s :D");
        console.log(data.categoryList);

        setCategoryList(data.categoryList);
        setCatListFetched(true);

      } else {
        console.log("Sikertelen lek??rdez??s! :(");
        console.log(data.resultMessage);
        //setFeedbackText("A kateg??ri??k lek??rdez??se sikertelen. " + data.resultMessage);
        //hitError(true);
      }

      setCatListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
      hitError(true);
    });
  };

  function fetchQualList() {
    fetch(serveraddress + '/qualification')
    .then(response => response.json())
    .then(data => {

      console.log('Success:', data);

      if (data.resultCode === 0 && data.qualificationList !== undefined && data.qualificationList !== null) {
        console.log("Sikeres lek??rdez??s :D");
        console.log(data.qualificationList);

        setQualificationList(data.qualificationList);
        setQualListFetched(true);

      } else {
        console.log("Sikertelen lek??rdez??s! :(");
        console.log(data.resultMessage);
        //setFeedbackText("A k??pes??t??sek lek??rdez??se sikertelen. " + data.resultMessage);
        //hitError(true);
      }

      setQualListFetched(true);

    })
    .catch((error) => {
      console.error('Error:', error);
      setFeedbackText("Hiba t??rt??nt a szerverhez val?? csatlakoz??sban!");
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

            <Typography variant="h5">??j kateg??ria</Typography>
            <Divider />

            <Grid container spacing={2} sx={{ mt : 1 }}>


              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>* Kateg??ria megnevez??se:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/*  kateg??ria neve */}
                <TextField id="categoryName" label="N??v" sx={{ mx : 'auto' , width : 1 }} variant="outlined"/>
              </Grid>


                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>* Elv??rt k??pes??t??s:</Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  {/* K??pes??t??s */}
                  <FormControl sx={{ mx : 'auto' ,  width : 1 }} id="qualSelectControl">
                    <InputLabel id="qualLabel">* K??pes??t??s</InputLabel>
                    <Select labelId="qualLabel" id="qualSelect" value={qualSelectValue} onChange={qualChange} label="K??pes??t??s">
                      {qualificationList !== undefined && qualificationList.map((qualification, index) => (
                        <MenuItem value={qualification.qualificationID} key={index}>{qualification.qualificationName}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>* Rendszeres karbantart??s:</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* peri??dusid?? */}
                  <FormControl sx={{ mx : 'auto' , width : 1 }}>
                    <InputLabel id="periodLabel">Peri??dus</InputLabel>
                    <Select labelId="periodLabel" id="periodSelect" value={categoryPeriod} onChange={periodChange} label="Peri??dus">
                      <MenuItem value={''}>nincs</MenuItem>
                      <MenuItem value={'eves'}>??ves</MenuItem>
                      <MenuItem value={'feleves'}>F??l??ves</MenuItem>
                      <MenuItem value={'negyedeves'}>Negyed??ves</MenuItem>
                      <MenuItem value={'havi'}>Havi</MenuItem>
                      <MenuItem value={'heti'}>Heti</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>* Karbantart??s normaideje (??ra):</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/*  normaid?? */}
                  <TextField id="categoryNormalTime"
                             label="Normaid??"
                             sx={{ mx : 'auto' , width : 1 }}
                             variant="outlined"
                             inputProps={{ inputMode: 'numeric',
                                           pattern: '[0-9]*' }}
                             />
                           <br />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <Typography variant="h6" sx={{ mt : 2 }}>* Kateg??ria le??r??sa:</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  {/* specification */}
                    <TextareaAutosize
                      id="specification"
                      minRows={3}
                      placeholder="A kateg??ria le??r??sa ??s karbantart??si utas??t??sai"
                      style={{ width: '100%' }}
                    />
                </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Typography variant="h6" sx={{ mt : 2 }}>Sz??l?? kateg??ria:</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                {/* parent */}
                <FormControl sx={{ mx : 'auto' ,  width : 1 }}>
                  <InputLabel id="parentLabel">Sz??l?? kateg??ria</InputLabel>
                  <Select labelId="parentLabel" id="parentSelect" value={parent} onChange={parentChange} label="Sz??l?? kateg??ria">
                    {categoryList !== undefined && categoryList.map((category, index) => (
                      <MenuItem value={category.categoryName} key={index}>{category.categoryName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

            </Grid>
          </CardContent>

          <CardActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                {/*<Button size="large" variant="outlined" color="warning" fullWidth>M??gsem</Button>*/}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Button size="large" variant="contained" color="success" onClick={addCategory} fullWidth>Hozz??ad??s</Button>
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

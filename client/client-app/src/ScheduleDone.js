import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UserContext } from "./User.js";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';


function ScheduleDone(props) {

  const {user, setUser} = useContext(UserContext);

  let navigate = useNavigate();

  const redirectToTasks = () => {
    navigate("/app/listOpTasks");
  }

  useEffect(() => {
    redirectToTasks();
  });

  return(
    <Box
      component="main"
      sx={{ flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` }}}
    >
      <Toolbar />

      <Typography variant="h2" sx={{ mt : { xs : 10 , lg : 16 } , width : 1 , textAlign : 'center' , mx : 0 , px : 0}}>
        Sikeres ütemezés! < br/>
      <Button size="large" variant="contained" color="success" onClick={redirectToTasks} fullWidth>Vissza</Button>
      </Typography>
    </Box>
  )

}

export default ScheduleDone;

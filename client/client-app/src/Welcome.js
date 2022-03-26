import * as React from 'react';
import { useState, useContext } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { UserContext } from "./User.js";

function Welcome(props) {

  const {user, setUser} = useContext(UserContext);

  return(
    <Box
      component="main"
      sx={{ flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` }}}
    >
      <Toolbar />

      <Typography variant="h2" sx={{ mt : { xs : 10 , lg : 16 } , width : 1 , textAlign : 'center' , mx : 0 , px : 0}}>
        Szia, {user.username}!
      </Typography>
    </Box>
  )

}

export default Welcome;

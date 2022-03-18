import Login from './Login.js';
import Layout from './Layout.js';
import { UserContext } from './User.js';
import { useState } from "react";
import ReactDOM from "react-dom";

function App() {

 const [user, setUser] = useState('state');

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Login />
    </UserContext.Provider>
  );

}

export default App;

import Login from './Login.js';
import Layout from './Layout.js';
import { UserContext } from './User.js';
import { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {

 const [user, setUser] = useState('state');

  return (
    <>
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path="/app" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>

    <Outlet />
    </>
  );

}

export default App;

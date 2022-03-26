import Login from './Login.js';
import Layout from './Layout.js';

import AddDeviceScreen from './AddDeviceScreen.js';
import ListDeviceScreen from './ListDeviceScreen.js';

import AddCategoryScreen from './AddCategoryScreen.js';
import ListCategoryScreen from './ListCategoryScreen.js';

import Welcome from './Welcome.js';

import { UserContext } from './User.js';
import { useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {

 const [user, setUser] = useState('state');

  return (
    <>
      <BrowserRouter>
          <UserContext.Provider value={{ user, setUser }}>
            <Routes>
              <Route index element={<Login />} />
              <Route path="/app" element={<Layout />}>
                <Route path="welcome" element={<Welcome />} />
                <Route path="newDevice" element={<AddDeviceScreen />} />
                <Route path="newCategory" element={<AddCategoryScreen />} />
                <Route path="categories" element={<ListCategoryScreen />} />
            </Route>
            </Routes>
        </UserContext.Provider>
      </BrowserRouter>

    <Outlet />
    </>
  );

}

export default App;

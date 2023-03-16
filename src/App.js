import "./App.css";
import IndexPage from "./IndexPage";
import {Routes, Route } from "react-router-dom";
import LoginPage from "./LogInPage";
import Layout from "./Layout";
import RegisterPage from "./RegisterPage";
import UserContextProvider from "./UserContext";
import axios from 'axios';
import ProfilePage from "./ProfilePage";
import PlacesPage from "./PlacesPage";
import PlacesFormPage from "./PlacesFormPage";
axios.defaults.withCredentials = true;
function App() {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<IndexPage />}></Route>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/account" element={<ProfilePage/>} />
            <Route path="/account/places" element={<PlacesPage/>} />
            <Route path="/account/places/new" element={<PlacesFormPage/>}/>
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;

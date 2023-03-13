import "./App.css";
import IndexPage from "./IndexPage";
import {Routes, Route } from "react-router-dom";
import LoginPage from "./LogInPage";
import Layout from "./Layout";
import RegisterPage from "./RegisterPage";
import UserContextProvider from "./UserContext";
import axios from 'axios';
import AccountPage from "./AccountPage";

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
            <Route path="/account/:subpage?" element={<AccountPage/>} />
          </Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;

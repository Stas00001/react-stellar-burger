import styles from "./app.module.css";
import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Header from "../app-header/header";
import AppLoader from "../UI/loader/app-loader/app-loader";

function App() {
  return (

    <BrowserRouter>
      <Header/>
      <AppLoader/>
    </BrowserRouter>
  );
}

export default App;

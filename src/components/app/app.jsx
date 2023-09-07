import styles from "./app.module.css";
import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Header from "../app-header/header";
import AppLoader from "../UI/loader/app-loader/app-loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItems } from "../../services/actions/ingredients";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
  return (

    <BrowserRouter>
      <Header/>
      <AppLoader/>
    </BrowserRouter>
  );
}

export default App;

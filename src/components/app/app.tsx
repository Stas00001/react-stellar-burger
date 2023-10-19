import styles from "./app.module.css";
import React, { FC } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../app-header/header";
import AppLoader from "../UI/loader/app-loader/app-loader";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getItems } from "../../services/actions/ingredients";
import { getUserData } from "../../services/actions/user";
const App: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
    dispatch(getUserData());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Header />
      <AppLoader />
    </BrowserRouter>
  );
};

export default App;

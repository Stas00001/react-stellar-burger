import Error from "../../../../pages/error";
import Constructor from "../../../../pages/constructor";
import Profile from "../../../../pages/profile";
import Login from "../../../../pages/login";
import Register from "../../../../pages/register";
import ForgotPassword from "../../../../pages/forgot-password";
import ResetPassword from "../../../../pages/reset-password";
import Order from "../../../../pages/order";
import ProfileForm from "../../../profile-form/profile-form";
import Feed from "../../../../pages/feed";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "../../../protected-route-element/protected-route-element";
import IngredientId from "../../../../pages/ingredients-id";
import IngredientDetails from "../../../ingredient-details/ingredient-details";
import Modal from "../../../modal/modal";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { CLEAR_INGREDIENT } from "../../../../services/actions/ingredients-details";
import ProfileOrder from "../../../profile-order/profile-order";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START,
} from "../../../../services/actions/ws-action";
const AppLoader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { orders } = useSelector((store) => store.ws);
  const ordersAuth = useSelector((store) => store.wsAuth.orders);
  const background = location.state && location.state.background;
  const { ingredient, successModal } = useSelector(
    (store) => store.ingredientsDetails
  );
  const [active, setActive] = useState(false);
  React.useEffect(() => {
    if (ingredient) {
      setActive(true);
    }
  }, [ingredient]);

  const handleModalClose = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_INGREDIENT,
      });
      navigate(-1);
    }, 600);
    setActive(false);
  };
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Constructor />}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement login={false}>
              <Profile />
            </ProtectedRouteElement>
          }
        >
          <Route path="" element={<ProfileForm />} />
          <Route
            path="/profile/order"
            element={<ProfileOrder path={"/profile/order"} />}
          />
        </Route>
        <Route
          path="/profile/order/:id"
          element={
            <ProtectedRouteElement login={false}>
              <Order
                data={ordersAuth}
                wsStart={WS_AUTH_CONNECTION_START}
                wsClose={WS_AUTH_CONNECTION_CLOSED}
              />
            </ProtectedRouteElement>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRouteElement login={true}>
              <Login />
            </ProtectedRouteElement>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <ProtectedRouteElement login={true}>
              <Register />
            </ProtectedRouteElement>
          }
        ></Route>
        <Route
          path="/reset-password"
          element={
            <ProtectedRouteElement login={true}>
              <ResetPassword />
            </ProtectedRouteElement>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <ProtectedRouteElement login={true}>
              <ForgotPassword />
            </ProtectedRouteElement>
          }
        ></Route>
        <Route path="*" element={<Error />}></Route>
        <Route path="/ingredients/:ingredientId" element={<IngredientId />} />
        <Route
          path="/feed"
          element={
            <ProtectedRouteElement login={false}>
              <Feed path={"/feed"} />
            </ProtectedRouteElement>
          }
        ></Route>
        <Route
          path="/feed/:id"
          element={
            <ProtectedRouteElement login={false}>
              <Order
                wsStart={WS_CONNECTION_START}
                wsClose={WS_CONNECTION_CLOSED}
                data={orders}
              />
            </ProtectedRouteElement>
          }
        ></Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal
                active={active}
                setActive={setActive}
                handleModalClose={handleModalClose}
              >
                {successModal && <IngredientDetails data={ingredient} />}
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AppLoader;

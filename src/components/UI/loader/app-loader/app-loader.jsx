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
import { useDispatch, useSelector } from "react-redux";
import ProfileOrder from "../../../profile-order/profile-order";
import Modal from "../../../modal/modal";
import { CLEAR_INGREDIENT } from "../../../../services/actions/ingredients-details";
import OrderInfo from "../../../order-info/order-info";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START,
} from "../../../../services/actions/ws-action";
const AppLoader = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { orders } = useSelector((store) => store.ws);
  const ordersAuth = useSelector((store) => store.wsAuth.orders);
  const background = location.state && location.state.background;
  const { items } = useSelector((store) => store.ingredients);
  const navigate = useNavigate();
  const handleModalClosePopupIngredient = () => {
    dispatch({
      type: CLEAR_INGREDIENT,
    });
    navigate(-1);
  };

  const handleModalClose = () => {
    navigate(-1);
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
        </Route>

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
        <Route path="/feed" element={<Feed path={"/feed"} />}></Route>
        <Route
          path="/feed/:id"
          element={
            <Order
              modal={false}
              wsStart={WS_CONNECTION_START}
              wsClose={WS_CONNECTION_CLOSED}
              data={orders}
            />
          }
        ></Route>
      </Routes>

      {background && (
        <Routes>
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal
                active={true}
                handleModalClose={handleModalClosePopupIngredient}
              >
                <IngredientDetails data={items} />{" "}
              </Modal>
            }
          />
        </Routes>
      )}
      {background && orders && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal active={true} handleModalClose={handleModalClose}>
                <OrderInfo data={orders} modal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
      {background && ordersAuth && (
        <Routes>
          <Route
            path="/profile/order/:id"
            element={
              <Modal active={true} handleModalClose={handleModalClose}>
                <OrderInfo data={ordersAuth} modal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

export default AppLoader;

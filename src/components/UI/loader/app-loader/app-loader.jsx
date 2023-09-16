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
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import ProtectedRouteElement from "../../../protected-route-element/protected-route-element";
import IngredientId from "../../../../pages/ingredients-id";
import IngredientDetails from "../../../ingredient-details/ingredient-details";
import { useSelector } from "react-redux";ß
import ProfileOrder from "../../../profile-order/profile-order";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_START,
} from "../../../../services/actions/ws-action";
const AppLoader = () => {
  const location = useLocation();
  const { orders } = useSelector((store) => store.ws);
  const ordersAuth = useSelector((store) => store.wsAuth.orders);
  const background = location.state && location.state.background;
  const { items } = useSelector((store) => store.ingredients);

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
        <Route path="/feed" element={<Feed path={"/feed"} />}></Route>
        <Route
          path="/feed/:id"
          element={
            <Order
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
            element={<IngredientDetails data={items} />}
          />
        </Routes>
      )}
    </>
  );
};

export default AppLoader;

import { Navigate, useLocation } from "react-router-dom";
import { getCookie } from "../../utils/cooke";
const ProtectedRouteElement = ({ children, login }) => {
  const location = useLocation();
  const isLogin = getCookie("accessToken");
  const from = location.state?.from.pathname || "/";
  if (login && isLogin) {
    return <Navigate to={from} />;
  }
  if (!login && !isLogin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRouteElement;

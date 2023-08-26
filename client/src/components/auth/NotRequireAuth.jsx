import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const NotRequireAuth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log(isLoggedIn);
  return isLoggedIn ? <Navigate to={"/"} replace /> : <Outlet />;
};

export default NotRequireAuth;

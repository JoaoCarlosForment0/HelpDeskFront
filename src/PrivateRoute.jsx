import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function PrivateRoute({ element: Component, ...rest }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div> Carregando </div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Component {...rest} />;
}

export default PrivateRoute;

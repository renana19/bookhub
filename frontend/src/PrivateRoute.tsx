import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "./App";

interface PrivateRouteProps {
  children: React.ReactNode;

}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { contextUser } = useContext(userContext);

  return contextUser ? children : <Navigate to="/Login" />;
}

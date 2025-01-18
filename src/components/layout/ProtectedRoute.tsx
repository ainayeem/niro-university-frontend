import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/featurs/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

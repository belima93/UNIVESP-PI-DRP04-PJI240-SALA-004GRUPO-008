import React from "react";
import { Outlet, Navigate } from "react-router-dom";

// Definir o tipo de user: pode ser boolean ou um objeto de usuário no futuro
const ProtectedRoutes: React.FC = () => {
  const user: boolean = true; // To do: Use Context API, user verification, get from API / Cookie

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;

import React from 'react';
import Routes from "./src/routes";
import { AuthProvider } from "./src/context/authProvider"

export default function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
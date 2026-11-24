// Router.jsx o el archivo donde tengas tu router
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/appLayout";
import Registro from "../components/registro";

function Router() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Registro />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default Router;

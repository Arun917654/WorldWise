import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import AppLayout from "../pages/AppLayout";
// import { useEffect, useState } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
// import PageNav from "./components/PageNav";
import { CityProvider } from "./context/CityProvider";
import { AuthProvider } from "./context/FakeAuthContext";
import ProtectedRoute from "../pages/RouteProtector";
function App() {
  // console.log(cities);
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />

            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* <Route index element={} /> */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="form" element={<Form />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="cities/:id" element={<City />} />
            </Route>

            <Route path="pricing" element={<Pricing />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  );
}

export default App;

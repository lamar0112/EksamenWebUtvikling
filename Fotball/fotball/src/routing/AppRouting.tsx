// START: AppRouting – all routing for frontenden
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdminAthletesPage from "../pages/AdminAthletesPage";
import AthleteEditPage from "../pages/AthleteEditPage";
import RegisterAthletePage from "../pages/RegisterAthletePage";

import VenuePage from "../pages/VenuePage";
import RegisterVenuePage from "../pages/RegisterVenuePage";
import VenueEditPage from "../pages/VenueEditPage";

import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";

const AppRouting = () => {
  return (
    <BrowserRouter>
      {/* START: felles header på alle sider */}
      <MainHeader />
      {/* SLUTT: felles header på alle sider */}

      {/* START: routes for alle sidene i løsningen */}
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Athletes */}
        <Route path="/athletes" element={<AdminAthletesPage />} />
        <Route path="/athletes/register" element={<RegisterAthletePage />} />
        <Route path="/athletes/edit/:id" element={<AthleteEditPage />} />

        {/* Venues */}
        <Route path="/venues" element={<VenuePage />} />
        <Route path="/venues/register" element={<RegisterVenuePage />} />
        <Route path="/venues/edit/:id" element={<VenueEditPage />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* SLUTT: routes for alle sidene i løsningen */}

      {/* START: felles footer på alle sider */}
      <MainFooter />
      {/* SLUTT: felles footer på alle sider */}
    </BrowserRouter>
  );
};

export default AppRouting;
// SLUTT: AppRouting

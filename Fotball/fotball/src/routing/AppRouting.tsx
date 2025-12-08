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
      <MainHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/athletes" element={<AdminAthletesPage />} />
        <Route path="/athletes/register" element={<RegisterAthletePage />} />
        <Route path="/athletes/edit/:id" element={<AthleteEditPage />} />

        <Route path="/venues" element={<VenuePage />} />
        <Route path="/venues/register" element={<RegisterVenuePage />} />
        <Route path="/venues/edit/:id" element={<VenueEditPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <MainFooter />
    </BrowserRouter>
  );
};

export default AppRouting;

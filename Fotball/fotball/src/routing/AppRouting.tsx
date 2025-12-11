// START: AppRouting – oppsett av ruter for hele appen
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdminAthletesPage from "../pages/AdminAthletesPage";
import RegisterAthletePage from "../pages/RegisterAthletePage";
import AthleteEditPage from "../pages/AthleteEditPage";
import RegisterVenuePage from "../pages/RegisterVenuePage";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

import MainHeader from "../components/layout/MainHeader";
import MainFooter from "../components/layout/MainFooter";
import VenueEditPage from "../pages/VenueEditPage";
import VenuePage from "../pages/VenuePage";

const AppRouting = () => {
  return (
    <BrowserRouter>
      {/* START: felles header */}
      <MainHeader />
      {/* SLUTT: felles header */}

      {/* START: hovedinnhold med ruter */}
      <Routes>
        {/* START: forside */}
        <Route path="/" element={<HomePage />} />
        {/* SLUTT: forside */}

        {/* START: athletes – admin og registrering */}
        <Route path="/athletes" element={<AdminAthletesPage />} />
        <Route path="/athletes/register" element={<RegisterAthletePage />} />
        <Route path="/athletes/edit/:id" element={<AthleteEditPage />} />
        {/* SLUTT: athletes – admin og registrering */}

        {/* START: venues – registrering/redigering */}

        <Route path="/venues" element={<VenuePage />} />
        <Route path="/venues/register" element={<RegisterVenuePage />} />
        <Route path="/venues/edit/:id" element={<VenueEditPage/>} />

        {/* SLUTT: venues – admin og registrering/redigering */}

        {/* START: dashboard – økonomi, lån og kjøp av spillere */}
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* SLUTT: dashboard – økonomi, lån og kjøp av spillere */}

        {/* START: fallback-side hvis rute ikke finnes */}
        <Route path="*" element={<NotFoundPage />} />
        {/* SLUTT: fallback-side hvis rute ikke finnes */}
      </Routes>
      {/* SLUTT: hovedinnhold med ruter */}

      {/* START: felles footer */}
      <MainFooter />
      {/* SLUTT: felles footer */}
    </BrowserRouter>
  );
};

export default AppRouting;
// SLUTT: AppRouting

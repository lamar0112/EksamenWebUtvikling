// START: AppRouting – oppsett av ruter for hele appen
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import AdminAthletesPage from "../pages/AdminAthletesPage";
import RegisterAthletePage from "../pages/RegisterAthletePage";
import AthleteEditPage from "../pages/AthleteEditPage";

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
      {/* START: felles header */}
      <MainHeader />
      {/* SLUTT: felles header */}

      {/* START: hovedinnhold med ruter */}
      <main>
        <Routes>
          {/* START: forside */}
          <Route path="/" element={<HomePage />} />
          {/* SLUTT: forside */}

          {/* START: athletes – admin og registrering */}
          <Route path="/athletes" element={<AdminAthletesPage />} />
          <Route path="/athletes/register" element={<RegisterAthletePage />} />
          <Route path="/athletes/edit/:id" element={<AthleteEditPage />} />
          {/* SLUTT: athletes – admin og registrering */}

          {/* START: venues – admin, registrering og redigering */}
          <Route path="/venues" element={<VenuePage />} />
          <Route path="/venues/register" element={<RegisterVenuePage />} />
          <Route path="/venues/edit/:id" element={<VenueEditPage />} />
          {/* SLUTT: venues – admin, registrering og redigering */}

          {/* START: dashboard – økonomi, lån og kjøp av spillere */}
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* SLUTT: dashboard – økonomi, lån og kjøp av spillere */}

          {/* START: fallback-side hvis rute ikke finnes */}
          <Route path="*" element={<NotFoundPage />} />
          {/* SLUTT: fallback-side hvis rute ikke finnes */}
        </Routes>
      </main>
      {/* SLUTT: hovedinnhold med ruter */}

      {/* START: felles footer */}
      <MainFooter />
      {/* SLUTT: felles footer */}
    </BrowserRouter>
  );
};

export default AppRouting;
// SLUTT: AppRouting

// START: MainHeader – toppmeny med logo og navigasjon
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  // START: felles klasser for lenker i menyen
  const linkBase = "text-sm px-3 py-1.5 rounded-full transition-colors";
  const active = "bg-sky-500/20 text-sky-300 border border-sky-500/40";
  const inactive = "text-slate-200 hover:bg-slate-800 hover:text-sky-300";
  // SLUTT: felles klasser for lenker i menyen

  return (
    <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        {/* START: logo / tittel */}
        <div className="text-sm font-semibold tracking-tight text-white">
          <span className="text-sky-400">SportsWorld</span>{" "}
          <span className="text-slate-200">Football Admin</span>
        </div>
        {/* SLUTT: logo / tittel */}

        {/* START: navigasjon med NavLink så aktiv side markeres */}
        <nav aria-label="Hovedmeny" className="flex gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/athletes"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Athletes
          </NavLink>
          <NavLink
            to="/venues"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Venues
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? active : inactive}`
            }
          >
            Dashboard
          </NavLink>
        </nav>
        {/* SLUTT: navigasjon med NavLink så aktiv side markeres */}
      </div>
    </header>
  );
};

export default MainHeader;
// SLUTT: MainHeader

// START: DashboardPage – wrapper rundt dashboard-komponenten

import DashbordComponent from "../components/dashbord/DashbordComponent";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift */}
        <header>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Se klubbens økonomi, ta opp lån og kjøp spillere.
          </p>
        </header>
        {/* SLUTT: overskrift */}

        {/* START: dashboardinnhold */}
        <DashbordComponent />
        {/* SLUTT: dashboardinnhold */}
      </section>
    </main>
  );
};

export default DashboardPage;

// SLUTT: DashboardPage

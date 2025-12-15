// START: DashboardPage – wrapper around the dashboard component
import DashbordComponent from "../components/dashbord/DashbordComponent";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: heading */}
        <header>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">
            View club finances, take loans and buy or sell players.
          </p>
        </header>
        {/* SLUTT: heading */}

        {/* START: dashboard content */}
        <DashbordComponent />
        {/* SLUTT: dashboard content */}
      </section>
    </main>
  );
};

export default DashboardPage;
// SLUTT: DashboardPage

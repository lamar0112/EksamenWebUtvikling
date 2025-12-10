// START: DashboardPage – wrapper rundt DashboardComponent
import DashboardComponent from "../components/dashbord/DashbordComponent";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift og intro-tekst */}
        <header>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">
            Få oversikt over økonomi og kjøp av utøvere.
          </p>
        </header>
        {/* SLUTT: overskrift og intro-tekst */}

        {/* START: selve dashboard-komponenten */}
        <DashboardComponent />
        {/* SLUTT: selve dashboard-komponenten */}
      </section>
    </main>
  );
};

export default DashboardPage;
// SLUTT: DashboardPage

// START: HomePage – hero med stadion, spotlight og to tekster (BEM)
const HomePage = () => {
  return (
    <main className="home">
      <div className="home__hero">
        {/* START: bakgrunnslag */}
        <div className="home__bg" />
        <div className="home__spotlight" />
        <div className="home__overlay" />
        {/* SLUTT: bakgrunnslag */}

        {/* START: tekst i himmel (bak spotlight) */}
        <p className="home__brand">SPORTSWORLD FOOTBALL</p>
        {/* SLUTT: tekst i himmel */}

        {/* START: tekst på ball */}
        <section className="home__content">
          <h1 className="home__title">
            Manage your <span className="home__title--squad">Squad</span>,{" "}
            <span className="home__title--stadiums">Stadiums</span> &{" "}
            <span className="home__title--finances">Finances</span>
          </h1>
        </section>
        {/* SLUTT: tekst på ball */}
      </div>
    </main>
  );
};

export default HomePage;
// SLUTT: HomePage

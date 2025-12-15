// START: HomePage – BEM
const HomePage = () => {
  return (
    <main className="home">
      <div className="home__hero">
        <div className="home__bg" />
        <div className="home__spotlight" />
        <div className="home__overlay" />

        <p className="home__brand">SPORTSWORLD FOOTBALL</p>

        <section className="home__content">
          <h1 className="home__title">
            Manage your <span className="home__title--squad">Squad</span>,{" "}
            <span className="home__title--stadiums">Stadiums</span> &{" "}
            <span className="home__title--finances">Finances</span>
          </h1>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
// SLUTT: HomePage

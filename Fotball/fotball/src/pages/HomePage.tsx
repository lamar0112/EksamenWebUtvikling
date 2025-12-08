import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <main className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">SportsWorld – Admin</h1>
            <p className="mb-4">
                Dette er adminløsningen for kjøp og administrasjon av fotballspillere
                og stadioner (venues).
            </p>

            <section className="grid gap-4 md:grid-cols-3">
                <article className="border rounded p-3">
                    <h2 className="font-semibold mb-2">Athletes</h2>
                    <p className="text-sm mb-2">
                        Se, registrer og rediger alle potensielle utøvere.
                    </p>
                    <Link to="/athletes" className="text-blue-700 underline text-sm">
                        Gå til Athletes-siden
                    </Link>
                </article>

                <article className="border rounded p-3">
                    <h2 className="font-semibold mb-2">Venues</h2>
                    <p className="text-sm mb-2">
                        Administrer venues for arrangementene.
                    </p>
                    <Link to="/venues" className="text-blue-700 underline text-sm">
                        Gå til Venues-siden
                    </Link>
                </article>

                <article className="border rounded p-3">
                    <h2 className="font-semibold mb-2">Dashboard</h2>
                    <p className="text-sm mb-2">
                        Få oversikt over økonomi og kjøp utøvere.
                    </p>
                    <Link to="/dashboard" className="text-blue-700 underline text-sm">
                        Gå til Dashboard
                    </Link>
                </article>
            </section>
        </main>
    );
};

export default HomePage;

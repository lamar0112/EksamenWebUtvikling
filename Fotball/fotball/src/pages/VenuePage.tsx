import VenueList from "../components/venues/VenueList";

const VenuePage = () => {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Venue Oversikt</h1>
            <VenueList />
        </main>
    );
};

export default VenuePage;

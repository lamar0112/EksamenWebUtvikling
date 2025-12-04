import { useState } from "react";
import venueService from "../../services/venueService";
import VenueItem from "./VenueItem";
import type IVenue from "../../interfaces/IVenue";

const VenueList = () => {
    const [venues, setVenues] = useState<IVenue[]>([]);

    const loadVenues = async () => {
        const response = await venueService.getAllVenues();
        if (response.success && response.data) setVenues(response.data);
    };

    return (
        <>
            <button
                onClick={loadVenues}
                className="px-3 py-1 bg-blue-600 text-white mb-4"
            >
                Hent Venues
            </button>

            <section className="grid grid-cols-12 gap-4">
                {venues.map((v, i) => (
                    <VenueItem key={i} venue={v} />
                ))}
            </section>
        </>
    );
};

export default VenueList;

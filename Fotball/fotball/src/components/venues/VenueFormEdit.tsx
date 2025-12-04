import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import venueService from "../../services/venueService";
import type IVenue from "../../interfaces/IVenue";

const VenueFormEdit = () => {
    const { id } = useParams();
    const [venue, setVenue] = useState<IVenue | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const response = await venueService.getVenueById(Number(id));
        if (response.success && response.data) setVenue(response.data);
    };

    const update = (e: any) =>
        venue && setVenue({ ...venue, [e.target.name]: e.target.value });

    const save = async () => {
        if (!venue) return;
        const response = await venueService.putVenue(venue);
        if (response.success) alert("Venue oppdatert");
    };

    if (!venue) return <p>Laster…</p>;

    return (
        <section className="border p-4 rounded">
            <input className="border p-2 w-full mb-2" name="name" value={venue.name} onChange={update} />
            <input className="border p-2 w-full mb-2" name="capacity" type="number" value={venue.capacity} onChange={update} />
            <input className="border p-2 w-full mb-2" name="image" value={venue.image} onChange={update} />

            <button className="px-3 py-1 bg-blue-600 text-white" onClick={save}>
                Lagre endringer
            </button>
        </section>
    );
};

export default VenueFormEdit;

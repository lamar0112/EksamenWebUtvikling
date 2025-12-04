import { useState } from "react";
import type IVenue from "../../interfaces/IVenue";
import venueService from "../../services/venueService";

const VenueFormAdd = () => {
    const [venue, setVenue] = useState<IVenue>({
        id: 0,
        name: "",
        capacity: 0,
        image: ""
    });

    const update = (e: any) =>
        setVenue({ ...venue, [e.target.name]: e.target.value });

    const save = async () => {
        const response = await venueService.postVenue(venue);
        if (response.success) alert("Venue lagret");
    };

    return (
        <section className="border p-4 rounded mb-4">
            <input className="border p-2 w-full mb-2" name="name" placeholder="Navn" onChange={update} />
            <input className="border p-2 w-full mb-2" name="capacity" type="number" placeholder="Kapasitet" onChange={update} />
            <input className="border p-2 w-full mb-2" name="image" placeholder="Bilde-filnavn" onChange={update} />
            
            <button className="px-3 py-1 bg-green-600 text-white" onClick={save}>
                Lagre Venue
            </button>
        </section>
    );
};

export default VenueFormAdd;

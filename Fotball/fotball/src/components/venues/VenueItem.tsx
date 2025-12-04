import type IVenue from "../../interfaces/IVenue";

const VenueItem = ({ venue }: { venue: IVenue }) => {
    return (
        <article className="border p-4 rounded col-span-3">
            <h3 className="font-bold text-center">{venue.name}</h3>

            {venue.image && (
                <img
                    src={`http://localhost:5163/images/${venue.image}`}
                    className="h-40 mx-auto mt-2"
                    alt={venue.name}
                />
            )}

            <p className="text-center mt-2">Kapasitet: {venue.capacity}</p>
        </article>
    );
};

export default VenueItem;

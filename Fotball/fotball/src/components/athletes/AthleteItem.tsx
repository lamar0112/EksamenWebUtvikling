import type IAthlete from "../../interfaces/IAthlete";

const AthleteItem = ({ athlete }: { athlete: IAthlete }) => {
    return (
        <article className="border p-4 rounded col-span-3">
            <h3 className="font-bold text-center">{athlete.name} (id: {athlete.id})</h3>

            {athlete.image && (
                <img
                    className="h-40 mx-auto mt-2"
                    src={`http://localhost:5163/images/${athlete.image}`}
                    alt={athlete.name}
                />
            )}

            <p className="text-center mt-2">Gender: {athlete.gender}</p>
            <p className="text-center">Price: {athlete.price} kr</p>
            <p className="text-center">{athlete.purchaseStatus ? "Kjøpt" : "Ikke kjøpt"}</p>
        </article>
    );
};

export default AthleteItem;

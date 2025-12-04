import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";

const AthleteFormAdd = () => {
    const [athlete, setAthlete] = useState<IAthlete>({
        id: 0,
        name: "",
        gender: "",
        price: 0,
        image: "",
        purchaseStatus: false
    });

    const update = (e: any) =>
        setAthlete({ ...athlete, [e.target.name]: e.target.value });

    const save = async () => {
        const response = await athleteService.postAthlete(athlete);
        if (response.success) alert("Athlete lagret");
    };

    return (
        <section className="mb-6 border p-4 rounded">
            <input className="border p-2 w-full mb-2" name="name" placeholder="Navn" onChange={update} />
            <input className="border p-2 w-full mb-2" name="gender" placeholder="Kjønn" onChange={update} />
            <input className="border p-2 w-full mb-2" name="price" type="number" placeholder="Pris" onChange={update} />
            <input className="border p-2 w-full mb-2" name="image" placeholder="Filnavn på bilde" onChange={update} />

            <button className="px-3 py-1 bg-green-600 text-white" onClick={save}>
                Lagre Athlete
            </button>
        </section>
    );
};

export default AthleteFormAdd;

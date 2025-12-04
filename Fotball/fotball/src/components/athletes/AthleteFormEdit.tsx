import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";

const AthleteFormEdit = () => {
    const { id } = useParams();
    const [athlete, setAthlete] = useState<IAthlete | null>(null);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        const response = await athleteService.getAthleteById(Number(id));
        if (response.success && response.data) setAthlete(response.data);
    };

    const update = (e: any) =>
        athlete && setAthlete({ ...athlete, [e.target.name]: e.target.value });

    const save = async () => {
        if (!athlete) return;
        const response = await athleteService.putAthlete(athlete);
        if (response.success) alert("Athlete oppdatert");
    };

    if (!athlete) return <p>Laster…</p>;

    return (
        <section className="border p-4 rounded">
            <input className="border p-2 w-full mb-2" name="name" value={athlete.name} onChange={update} />
            <input className="border p-2 w-full mb-2" name="gender" value={athlete.gender} onChange={update} />
            <input className="border p-2 w-full mb-2" name="price" type="number" value={athlete.price} onChange={update} />
            <input className="border p-2 w-full mb-2" name="image" value={athlete.image} onChange={update} />

            <button className="px-3 py-1 bg-blue-600 text-white" onClick={save}>
                Lagre endringer
            </button>
        </section>
    );
};

export default AthleteFormEdit;

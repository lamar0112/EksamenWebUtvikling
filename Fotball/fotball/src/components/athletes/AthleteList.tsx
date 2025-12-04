import { useState } from "react";
import type IAthlete from "../../interfaces/IAthlete";
import athleteService from "../../services/athleteService";
import AthleteItem from "./AthleteItem";

const AthleteList = () => {
    const [athletes, setAthletes] = useState<IAthlete[]>([]);

    const loadAthletes = async () => {
        const response = await athleteService.getAllAthletes();
        if (response.success && response.data) {
            setAthletes(response.data);
        }
    };

    return (
        <>
            <button
                onClick={loadAthletes}
                className="px-3 py-1 bg-blue-600 text-white mb-4"
            >
                Hent Athletes
            </button>

            <section className="grid grid-cols-12 gap-4">
                {athletes.map((athlete, i) => (
                    <AthleteItem key={i} athlete={athlete} />
                ))}
            </section>
        </>
    );
};

export default AthleteList;

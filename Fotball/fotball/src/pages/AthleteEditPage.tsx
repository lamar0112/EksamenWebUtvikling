// START: AthleteEditPage – side for å redigere en athlete
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type IAthlete from "../interfaces/IAthlete";
import athleteService from "../services/athleteService";
import AthleteFormEdit from "../components/athletes/AthleteFormEdit";

const AthleteEditPage = () => {
  // START: henter id fra url og setter opp state
  const { id } = useParams();
  const [athlete, setAthlete] = useState<IAthlete | null>(null);
  const [loading, setLoading] = useState(true);
  // SLUTT: henter id fra url og setter opp state

  // START: laster data for valgt athlete
  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const response = await athleteService.getAthleteById(Number(id));
      if (response.success && response.data) {
        setAthlete(response.data);
      }
      setLoading(false);
    };

    load();
  }, [id]);
  // SLUTT: laster data for valgt athlete

  // START: oppdaterer felter når brukeren skriver
  const handleChange = (field: string, value: string | number) => {
    if (!athlete) return;

    setAthlete({
      ...athlete,
      [field]: field === "price" ? Number(value) : value,
    });
  };
  // SLUTT: oppdaterer felter når brukeren skriver

  // START: lagrer endringene via API
  const handleSave = async () => {
    if (!athlete) return;

    const response = await athleteService.putAthlete(athlete);
    if (response.success) {
      alert("Athlete oppdatert");
    } else {
      alert("Feil ved lagring");
    }
  };
  // SLUTT: lagrer endringene via API

  // START: enkel loading og feilhåndtering
  if (loading) {
    return <p className="p-4 text-slate-300">Laster spiller...</p>;
  }

  if (!athlete) {
    return <p className="p-4 text-red-400">Fant ikke athlete</p>;
  }
  // SLUTT: enkel loading og feilhåndtering

  // START: visning av side med skjema
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <section className="mx-auto max-w-6xl space-y-6">
        {/* START: overskrift og tekst */}
        <header>
          <h1 className="text-2xl font-bold">Rediger Athlete</h1>
          <p className="text-sm text-slate-400">
            Oppdater informasjonen for denne utøveren.
          </p>
        </header>
        {/* SLUTT: overskrift og tekst */}

        {/* START: skjema-komponent for redigering */}
        <AthleteFormEdit
          athlete={athlete}
          onChange={handleChange}
          onSave={handleSave}
        />
        {/* SLUTT: skjema-komponent for redigering */}
      </section>
    </main>
  );
  // SLUTT: visning av side med skjema
};

export default AthleteEditPage;
// SLUTT: AthleteEditPage

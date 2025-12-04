import AthleteFormAdd from "../components/athletes/AthleteFormAdd";
import AthleteList from "../components/athletes/AthleteList";

const AdminAthletesPage = () => {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Athlete Admin</h1>
            <AthleteFormAdd />
            <AthleteList />
        </main>
    );
};

export default AdminAthletesPage;

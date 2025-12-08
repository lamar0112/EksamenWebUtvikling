import { NavLink } from "react-router-dom";

const MainHeader = () => {
    const linkBase =
        "px-3 py-2 text-sm font-medium hover:underline";
    const active = "text-blue-700";
    const inactive = "text-gray-800";

    return (
        <header className="border-b bg-white">
            <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
                <span className="font-bold text-lg">
                    SportsWorld Football
                </span>

                <div className="flex gap-3">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/athletes"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                        Athletes
                    </NavLink>
                    <NavLink
                        to="/venues"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                        Venues
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `${linkBase} ${isActive ? active : inactive}`
                        }
                    >
                        Dashboard
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default MainHeader;

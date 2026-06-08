import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [mission, setMission] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:3000/mission")
            .then((response) => {
                setMission(response.data);
            });
    }, []);

    return (
        <main className="container">
            <h2 className="title">Dashboard da Missão</h2>

            {mission && (
                <section className="cards">
                    <div className="card">
                        <h3>Dia da Missão</h3>
                        <p>{mission.missionDay}</p>
                    </div>

                    <div className="card">
                        <h3>Status</h3>
                        <p>{mission.status}</p>
                    </div>

                    <div className="card">
                        <h3>Oxigênio</h3>
                        <p>{mission.oxygen}%</p>
                    </div>

                    <div className="card">
                        <h3>Água</h3>
                        <p>{mission.water}%</p>
                    </div>

                    <div className="card">
                        <h3>Energia</h3>
                        <p>{mission.energy}%</p>
                    </div>
                </section>
            )}
        </main>
    );
}

export default Dashboard;
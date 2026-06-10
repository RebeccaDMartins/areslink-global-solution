import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
    const [mission, setMission] = useState(null);

    useEffect(() => {
        axios
            .get("https://areslink-backend.onrender.com/mission")
            .then((response) => {
                setMission(response.data);
            });
    }, []);

    return (
        <main className="container">
            <section className="dashboard-header">
                <div>
                    <span className="eyebrow">Centro de Controle</span>
                    <h2 className="title">Dashboard da Missão</h2>
                    <p className="dashboard-description">
                        Monitoramento em tempo real dos principais indicadores da missão AresLink.
                    </p>
                </div>

                {mission && (
                    <div className="mission-day-panel">
                        <span>Dia da Missão</span>
                        <strong>{mission.missionDay}</strong>
                    </div>
                )}
            </section>

            {mission && (
                <section className="mission-grid">
                    <div className="status-panel">
                        <span>Status Operacional</span>
                        <strong>{mission.status}</strong>
                    </div>

                    <div className="resource-card">
                        <span>Oxigênio</span>
                        <strong>{mission.oxygen}%</strong>
                        <div className="progress-bar">
                            <div style={{ width: `${mission.oxygen}%` }}></div>
                        </div>
                    </div>

                    <div className="resource-card">
                        <span>Água</span>
                        <strong>{mission.water}%</strong>
                        <div className="progress-bar">
                            <div style={{ width: `${mission.water}%` }}></div>
                        </div>
                    </div>

                    <div className="resource-card">
                        <span>Energia</span>
                        <strong>{mission.energy}%</strong>
                        <div className="progress-bar">
                            <div style={{ width: `${mission.energy}%` }}></div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}

export default Dashboard;
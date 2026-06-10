import { useState, useEffect } from "react";
import axios from "axios";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    useEffect(() => {
        axios
            .get("https://areslink-backend.onrender.com/tasks")
            .then((response) => {
                setTasks(response.data);
            });
    }, []);

    const handleSubmit = async () => {
        const newTask = {
            title,
            priority,
            assignedTo,
        };

        const response = await axios.post(
            "https://areslink-backend.onrender.com/tasks",
            newTask
        );

        setTasks([...tasks, response.data]);
        setTitle("");
        setPriority("");
        setAssignedTo("");
    };

    const handleCompleteTask = async (id) => {
        const response = await axios.put(
            `https://areslink-backend.onrender.com/tasks/${id}`
        );

        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return response.data;
            }

            return task;
        });

        setTasks(updatedTasks);
    };

    const getPriorityClass = (priority) => {
        if (priority === "Alta") return "priority-high";
        if (priority === "Média") return "priority-medium";
        return "priority-low";
    };

    return (
        <main className="container">
            <section className="page-header">
                <span className="eyebrow">Operação da Missão</span>
                <h2 className="title">Centro Operacional</h2>
                <p className="dashboard-description">
                    Crie, acompanhe e conclua tarefas críticas relacionadas à missão.
                </p>
            </section>

            <section className="panel">
                <h3>Nova Tarefa</h3>

                <div className="form">
                    <input
                        type="text"
                        placeholder="Título da tarefa"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Prioridade: Alta, Média ou Baixa"
                        value={priority}
                        onChange={(event) => setPriority(event.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Responsável"
                        value={assignedTo}
                        onChange={(event) => setAssignedTo(event.target.value)}
                    />

                    <button onClick={handleSubmit}>
                        Criar Tarefa
                    </button>
                </div>
            </section>

            <section className="cards">
                {tasks.map((task) => (
                    <article className="task-card" key={task.id}>
                        <div className="card-topline">
                            <span>Tarefa</span>
                            <span
                                className={
                                    task.status === "Concluída"
                                        ? "status-success"
                                        : "status-warning"
                                }
                            >
                                {task.status}
                            </span>
                        </div>

                        <h3>{task.title}</h3>

                        <p>
                            <strong>Prioridade:</strong>
                            <span className={getPriorityClass(task.priority)}>
                                {task.priority}
                            </span>
                        </p>

                        <p>
                            <strong>Responsável:</strong> {task.assignedTo}
                        </p>

                        <button onClick={() => handleCompleteTask(task.id)}>
                            Concluir Tarefa
                        </button>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Tasks;
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

    return (
        <main className="container">
            <h2 className="title">Tarefas da Missão</h2>

            <div className="form">
                <input
                    type="text"
                    placeholder="Título da tarefa"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                <input
                    type="text"
                    placeholder="Prioridade"
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

            <section className="cards">
                {tasks.map((task) => (
                    <div className="card" key={task.id}>
                        <h3>{task.title}</h3>
                        <p><strong>Prioridade:</strong> {task.priority}</p>
                        <p><strong>Responsável:</strong> {task.assignedTo}</p>
                        <p><strong>Status:</strong> {task.status}</p>

                        <button onClick={() => handleCompleteTask(task.id)}>
                            Concluir Tarefa
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Tasks;
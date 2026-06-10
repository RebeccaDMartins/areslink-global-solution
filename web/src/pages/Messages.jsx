import { useState, useEffect } from "react";
import axios from "axios";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        axios
            .get("https://areslink-backend.onrender.com/messages")
            .then((response) => {
                setMessages(response.data);
            });
    }, []);

    const handleSubmit = async () => {
        const newMessage = {
            sender: "Terra",
            receiver: "Marte",
            title,
            content,
        };

        const response = await axios.post(
            "https://areslink-backend.onrender.com/messages",
            newMessage
        );

        setMessages([...messages, response.data]);
        setTitle("");
        setContent("");
    };

    const formatStatus = (status) => {
        if (status === "received") return "Recebida";
        if (status === "transmitting") return "Transmitindo";
        return status;
    };

    return (
        <main className="container">
            <section className="page-header">
                <span className="eyebrow">Terra e Marte</span>
                <h2 className="title">Centro de Comunicações</h2>
                <p className="dashboard-description">
                    Envie instruções para a tripulação e acompanhe o histórico de
                    mensagens da missão.
                </p>
            </section>

            <section className="panel">
                <h3>Nova Transmissão</h3>

                <div className="form">
                    <input
                        type="text"
                        placeholder="Assunto da mensagem"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <textarea
                        placeholder="Digite a mensagem"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />

                    <button onClick={handleSubmit}>
                        Enviar para Marte
                    </button>
                </div>
            </section>

            <section className="cards">
                {messages.map((message) => (
                    <article className="message-card" key={message.id}>
                        <div className="card-topline">
                            <span>Transmissão</span>
                            <span
                                className={
                                    formatStatus(message.status) === "Recebida"
                                        ? "status-success"
                                        : "status-warning"
                                }
                            >
                                {formatStatus(message.status)}
                            </span>
                        </div>

                        <h3>{message.title}</h3>

                        <p>
                            <strong>De:</strong> {message.sender}
                        </p>

                        <p>
                            <strong>Para:</strong> {message.receiver}
                        </p>

                        <p>{message.content}</p>
                    </article>
                ))}
            </section>
        </main>
    );
}

export default Messages;
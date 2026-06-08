import { useState, useEffect } from "react";
import axios from "axios";

function Messages() {
    const [messages, setMessages] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3000/messages")
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
            "http://localhost:3000/messages",
            newMessage
        );

        setMessages([...messages, response.data]);

        setTitle("");
        setContent("");
    };

    return (
        <main className="container">
            <h2 className="title">Comunicações da Missão</h2>

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

            <section className="cards">
                {messages.map((message) => (
                    <div className="card" key={message.id}>
                        <h3>{message.title}</h3>
                        <p><strong>De:</strong> {message.sender}</p>
                        <p><strong>Para:</strong> {message.receiver}</p>
                        <p>{message.content}</p>
                        <p><strong>Status:</strong> {message.status}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Messages;
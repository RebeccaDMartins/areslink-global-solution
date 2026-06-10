import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Tasks from "./pages/Tasks";
import "./App.css";

function App() {
  const [credential, setCredential] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (credential === "123456") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Credencial inválida. Tente utilizar 123456.");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="login-page">
        <section className="login-card">
          <h1>AresLink</h1>
          <p>Informe a credencial de acesso a missão: </p>

          <input
            type="text"
            placeholder="123456"
            value={credential}
            onChange={(event) => setCredential(event.target.value)}
          />

          {error && <span className="error-message">{error}</span>}

          <button onClick={handleLogin}>
            Acessar Sistema
          </button>
        </section>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
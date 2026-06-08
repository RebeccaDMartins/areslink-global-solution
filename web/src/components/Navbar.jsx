import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className="navbar">
            <h1>AresLink 🚀</h1>

            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/messages">Mensagens</Link>
                <Link to="/tasks">Tarefas</Link>
            </div>
        </nav>
    );
}

export default Navbar;
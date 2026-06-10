import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="brand">
                <img src={logo} alt="AresLink" className="brand-logo" />
            </div>

            <div className="nav-links">
                <Link to="/">Dashboard</Link>
                <Link to="/messages">Mensagens</Link>
                <Link to="/tasks">Tarefas</Link>
            </div>
        </nav>
    );
}

export default Navbar;
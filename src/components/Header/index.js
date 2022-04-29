import './header.css';
import { Link } from 'react-router-dom';
export default function Header(){
    return(
        <header>
            <Link className="logo" to="/">NeteFelix</Link>
            <Link className="favs" to="/favoritos">Favoritos</Link>
        </header>
    )
}
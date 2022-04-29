import { Link } from 'react-router-dom';
import './erro.css';
export default function Notfound(){
    return(
        <div className="notfound">

            <h1 className="notfound-title">404</h1>
            <h2 className="notfound-subtitle">Página não encontrada</h2>
            <Link to={"/"} className="voltar">Voltar</Link>
        </div>
    );
}
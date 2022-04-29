import './favs.css';
import { useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Favoritos(){

    const [ filmes , setFilmes] = useState([]);

    useEffect( () =>{
        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || [] );
    }, []);

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (item) => {
            return (item.id !== id)
        });

        setFilmes(filtroFilmes);
        localStorage.setItem('filmes' , JSON.stringify(filtroFilmes));
        toast.success('info excluído com sucesso!!!!');
    }
    return(
        <div id="meus-filmes">
            <h1 className="titulo-lista"> Meus favoritos </h1>

            {filmes.length === 0 && <span className="recado">Sua lista está vazia :(</span>}
            
            <ul>
                {filmes.map( (item) => {
                    return(
                        <li key={item.id}>
                            <span>{item.nome}</span>

                            <diu>
                                <Link to={ `/filme/${item.id}`} className="detalhes">Ver Filme</Link>
                                <button onClick={ () => excluirFilme(item.id) } className="btn-excluir">Excluir</button>
                            </diu>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
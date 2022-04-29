import { useEffect , useState } from "react";
import './filme.css';
import { useParams  , useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [ filme , setFilme ] = useState([]);
    const [ loading , setLoading] = useState(true);

    useEffect( () => {
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`) ;
            
            if(response.data.length === 0){
                //tentou acessar com id inexistente
                navigate('/');
                return;
            }

            setFilme(response.data);
            setLoading(false);
        }
        loadFilme(); 

        return () => {
            console.log('desmontou')
        }

    }, [navigate ,id]);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');
        let filmesSalvos = JSON.parse(minhaLista) || [];

        //caso o msm filme já esteja salvo
        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id );
        
        if(hasFilme){
            toast.error('Este filme já está salvo');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes' , JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!!');


    }

    if(loading){
        return(
            <div className="film-info">Carregando.......</div>
        );
    }
    return(
        <div className="filme-info">
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome} />
            <h3>Sinopse</h3>
            <p> {filme.sinopse} </p>
            <div className="botoes">
                <button onClick={ salvaFilme }>Salvar</button>
                <button>
                    <a target="blank"  href= {`https://www.youtube.com/results?search_query=trailer+${filme.nome}`} >Trailer</a>
                </button>
            </div>
        </div>
    );

}
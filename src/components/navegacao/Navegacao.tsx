import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NAVIGATION_PAGE } from "../../services/constants/system.constants";

type NavegacaoProps = {
  tituloPagina: string;
  link: string;
  acao: string,
};

const Navegacao = ({ tituloPagina, link, acao }: NavegacaoProps) => {
  return (
    <div className="local_sistema">
      <h2>{tituloPagina}</h2>
      <Link to={link} className="btn btn-link" title={acao}>
        <i>
          <FaArrowLeft />
        </i>
        <span>{NAVIGATION_PAGE.VOLTAR}</span>
      </Link>
    </div>
  );
};

export default Navegacao;

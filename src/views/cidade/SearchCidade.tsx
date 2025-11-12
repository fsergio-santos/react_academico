import { useRef, useState } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Button from "../../components/button/Button";
import Card from "../../components/card/card";
import Input from "../../components/input/Input";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/modal/ShowModal";
import PaginationFooter from "../../components/pagination/PaginationFooter";
import { useAlert } from "../../contexto/AlertContexto";
import { BTN } from "../../services/constants/system.constants";
import { CIDADE } from "../../services/modules/cidade/constants/cidade.constants";
import { useListar } from "../../services/modules/cidade/hooks/useListar";
import type { Cidade } from "../../services/modules/cidade/type/cidade";
import AddCidade from "./AddCidade";

interface SearchCidadeProps {
  onClose: () => void;
  onSelect: (cidade: Cidade) => void;
}

const SearchCidade = ({ onClose, onSelect }: SearchCidadeProps) => {
  const { loading } = useAlert();
  const [isNovaCidade, setIsNovaCidade] = useState<boolean>(false);

  const {
    currentPage,
    recordsPerPage,
    searchTerm,
    filteredData,
    totalPages,
    currentRecords,
    handleSort,
    handlePageChange,
    getSortIcon,
    setSearchTerm,
  } = useListar();

  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={tableRef}>
      <div className="container">
        <div className="display">
          {loading ? <Loading /> : null}

          <Card widthCard="100%">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2 className="mb-4">{CIDADE.TITULO.PESQUISAR}</h2>
              <button onClick={onClose} title="Fechar" className="btn-close">
                &times;
              </button>
            </div>
            <div className="table-toolbar-container">
              <div className="table-toolbar-left">
                <Input
                  className="form-control"
                  placeholder="Pesquisar..."
                  aria-label="Campo de pesquisa"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="table-toolbar-right">
                <Button
                  title={CIDADE.OPERACAO.CRIAR.ACAO}
                  className="btn btn-add ml-3 "
                  icon={<FaPlus />}
                  onClick={() => setIsNovaCidade(true)}
                >
                  {BTN.NEW}
                </Button>
              </div>
            </div>
            <div id="no_more_table">
              <table className="table table-bordered table-striped cf">
                <thead>
                  <tr>
                    <th
                      onClick={() => handleSort(CIDADE.FIELDS.CODIGO)}
                      className="table-sort-cursor"
                    >
                      {CIDADE.LABEL.CODIGO_CIDADE}{" "}
                      {getSortIcon(CIDADE.FIELDS.CODIGO)}
                    </th>
                    <th
                      onClick={() => handleSort(CIDADE.FIELDS.NOME)}
                      className="table-sort-cursor"
                    >
                      {CIDADE.LABEL.NOME_CIDADE}{" "}
                      {getSortIcon(CIDADE.FIELDS.NOME)}
                    </th>
                    <th>Selecione</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.length > 0 ? (
                    currentRecords.map((model) => (
                      <tr key={model.idCidade}>
                        <td data-label={CIDADE.LABEL.CODIGO_CIDADE}>
                          {model.codCidade}
                        </td>
                        <td data-label={CIDADE.LABEL.NOME_CIDADE}>
                          {model.nomeCidade}
                        </td>
                        <td>
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelect(model);
                              onClose();
                            }}
                            className="btn btn-search btn-md"
                          >
                            {<BiSolidSelectMultiple />} {BTN.SELECT}
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>Nenhum resultado encontrado</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <PaginationFooter
                currentPage={currentPage}
                pageSize={recordsPerPage}
                totalElements={filteredData.length}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="custom-divider"></div>
            <div className="btn-content mt-4 mb-4">
              <div className="btn-wrapper">
                <Button
                  type={BTN.TYPE.BUTTON}
                  title={CIDADE.OPERACAO.CRIAR.CANCELAR}
                  onClick={onClose}
                  className="btn btn-cancel"
                  icon={<MdCancel />}
                >
                  {BTN.CANCEL}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div>
        <Modal isOpen={isNovaCidade} setModalOpen={setIsNovaCidade}>
          <AddCidade onClose={() => setIsNovaCidade(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default SearchCidade;

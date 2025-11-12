import React from "react";
import { useAlert } from "../../contexto/AlertContexto";
import { http } from "../../services/axios/config.axios";
import {
  REST_CONFIG,
  STATUS_TYPES,
  VALIDATION_RULES,
} from "../../services/constants/system.constants";

type ImagemProps = {
  id: number;
  urlSalvar: string;
  urlDeletar: string;
  titulo?: string;
  onUploadSuccess: (nomeArquivo: string, ct: string) => void;
  onDeleteSuccess: (nomeArquivo: string, ct: string) => void;
};

const Imagem = ({
  id,
  urlSalvar,
  urlDeletar,
  titulo,
  onUploadSuccess,
  onDeleteSuccess,
}: ImagemProps) => {
  const uploadedImage = React.useRef<HTMLImageElement | null>(null);
  const fileRef = React.useRef<{ file?: File } | null>({});
  const imageUpLoader = React.useRef<HTMLInputElement | null>(null);
  const [foto, setFoto] = React.useState<string>(VALIDATION_RULES.STRING);
  const { setLoading, showAlert } = useAlert();
  const maxSize = 209715200;

  const selectArquivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const [file] = files;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      showAlert(
        `Esse tipo de arquivo da imagem não é permitido: ${file.type}`,
        STATUS_TYPES.DANGER
      );
      return;
    }

    if (file.size > maxSize) {
      showAlert(
        `O tamanho do arquivo máximo da imagem permitido é de ${maxSize} e o enviado é de ${file.size}`,
        STATUS_TYPES.DANGER
      );
      return;
    }

    const reader = new FileReader();
    fileRef.current = { file };

    reader.onload = (event) => {
      if (uploadedImage.current && event.target?.result) {
        uploadedImage.current.src = event.target.result as string;
      }
    };

    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("id", id.toString());
    formData.append("foto", file);

    try {
      setLoading(true);
      const response = await http.post(urlSalvar, formData, {
        headers: { "Content-type": "multipart/form-data" },
      });

      const {
        mensagem,
        status,
        objeto: { nomeArquivo, contentType: ct },
      } = response.data;
      setFoto(nomeArquivo);
      onUploadSuccess(nomeArquivo, ct);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const excluirFoto = async (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    if (!foto) return;

    try {
      setLoading(true);
      const response = await http.delete(urlDeletar, {
        headers: { "Content-type": "application/json" },
        data: { id, nomeArquivo: foto },
      });
      const { mensagem, status } = response.data;
      setFoto("");
      if (uploadedImage.current) uploadedImage.current.src = REST_CONFIG.USER_IMAGE;
      onDeleteSuccess(REST_CONFIG.USER_IMAGE, "");
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="card">
      <div className="card-body text-center p-4">
        <img
          src={
            foto === "" || foto === null
              ? REST_CONFIG.USER_IMAGE
              : `${REST_CONFIG.URL_IMAGEM}${foto}`
          }
          alt="Foto do Perfil"
          className="mb-3"
          style={{
            width: "250px",
            height: "250px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #eee",
          }}
          onClick={(e) => excluirFoto(e)}
        />
        <div>
          <label htmlFor="fotoInput" className="btn btn-edit">
            <span className="btn-label">Alterar Foto</span>
          </label>
          <input
            type="file"
            id="fotoInput"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            ref={imageUpLoader}
            onChange={(e) => selectArquivo(e)}
          />
        </div>
        <small className="text-secondary mt-2 d-block">
          PNG ou JPG (Máx: 5MB)
        </small>
      </div>
    </div>
  );
};

export default Imagem;

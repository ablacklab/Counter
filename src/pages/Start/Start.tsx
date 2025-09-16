import { useRef } from "react";
import {
  updateDate,
  updateFile,
  updateParticipants,
} from "../../store/slices/formSlice";
import type { StoreType } from "../../store/store";
import "./Start.css";
import { useDispatch, useSelector } from "react-redux";
import { countRols } from "../../utils/count";
import { updateResults } from "../../store/slices/resultSlice";
import { useNavigate } from "react-router-dom";
import { littleMessages } from "../../utils/messages";

const Start = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useSelector((state: StoreType) => state.form);
  const isFilled = form.date && form.participants && form.file;

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        dispatch(
          updateFile({
            content,
            name: file.name,
          })
        );
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    const results = countRols(form.file!, form.date, form.participants);
    dispatch(updateResults(results));

    navigate("/resultados");
  };

  return (
    <section className="page">
      <h2>🌼 Rol Counter</h2>

      <section className="form-group">
        <div className="input-group">
          <small>Subir chat exportado</small>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
        </div>

        <div className="input-group">
          <small>Contar a partir de la siguiente fecha</small>
          <input
            type="date"
            id="date"
            name="date"
            onChange={(e) => dispatch(updateDate(e.target.value))}
          />
        </div>

        <div className="input-group">
          <small>Número de participantes</small>
          <input
            type="number"
            id="participants"
            name="participants"
            onChange={(e) =>
              dispatch(updateParticipants(Number(e.target.value)))
            }
          />
        </div>

        <button disabled={!isFilled} onClick={handleSubmit}>
          Contar
        </button>
      </section>

      <p>{littleMessages[Math.floor(Math.random() * littleMessages.length)]}</p>
    </section>
  );
};

export default Start;

import { useRef } from "react";
import "./Form.css";
import { useDispatch, useSelector } from "react-redux";
import type { StoreType } from "../../store/store";
import {
  updateDate,
  updateFile,
  updateParticipants,
} from "../../store/slices/formSlice";
import { countRols } from "../../utils/count";
import { updateResults } from "../../store/slices/resultSlice";

const Form = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useSelector((state: StoreType) => state.form);
  const ghosts = useSelector((state: StoreType) => state.results.ghosts);

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
  };

  return (
    <section className="small-form">
      <section className="results-form">
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        <input
          type="date"
          id="date"
          name="date"
          onChange={(e) => dispatch(updateDate(e.target.value))}
          value={form.date || ""}
        />
        <input
          type="number"
          id="participants"
          name="participants"
          onChange={(e) => dispatch(updateParticipants(Number(e.target.value)))}
          value={form.participants || ""}
        />
        <button onClick={handleSubmit}>Contar de nuevo</button>
      </section>
      <small>
        {form.fileName || "No file chosen"} <br /> {ghosts} fantasmas
      </small>
    </section>
  );
};

export default Form;

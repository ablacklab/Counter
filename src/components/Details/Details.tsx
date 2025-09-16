import { useDispatch, useSelector } from "react-redux";
import "./Details.css";
import { toggleDetails, type UsserType } from "../../store/slices/resultSlice";

const Details = () => {
  const selectedUser = useSelector((state: any) => state.results.selectedUser);
  const ussers = useSelector((state: any) => state.results);
  const usser: UsserType = ussers.results.find(
    (u: UsserType) => u.name === selectedUser
  ) || { name: "", messages: { on: [], off: [] }, count: { on: 0, bonus: 0 } };
  const dispatch = useDispatch();

  return (
    <section className={`details ${ussers.isDetailsOpen ? "open" : ""}`}>
      <h3>{usser.name}</h3>
      <p className="details-close" onClick={() => dispatch(toggleDetails())}>
        <u>Ocultar</u>
      </p>

      <div className="details-off">
        <p>
          <b>Rol</b>
        </p>

        {usser.messages.on.length === 0 && <small>Sin mensajes</small>}

        {usser.messages.on.map((msg, index) => (
          <div key={index} className="details-message">
            <p>{msg}</p>
            <hr />
          </div>
        ))}
      </div>

      <div className="details-off">
        <p>
          <b>Off rol</b>
        </p>

        {usser.messages.off.length === 0 && <small>Sin mensajes</small>}

        {usser.messages.off.map((msg, index) => (
          <div key={index} className="details-message">
            <p>{msg}</p>
            <hr />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Details;

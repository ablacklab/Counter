import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  toggleDetails,
  type UsserType,
} from "../../store/slices/resultSlice";
import "./Card.css";

const Card = ({ usser }: { usser: UsserType }) => {
  const dispatch = useDispatch();
  const selectedUsser = useSelector((state: any) => state.results.selectedUser);

  const isSelected = selectedUsser === usser.name;

  const isDetailsOpen = useSelector(
    (state: any) => state.results.isDetailsOpen
  );

  return (
    <div
      className={`card ${isSelected ? "selected" : ""} ${
        isDetailsOpen ? "details-open" : ""
      }`}
      onClick={() => {
        dispatch(selectUser(usser.name));

        if (!isDetailsOpen) {
          dispatch(toggleDetails());
        }
      }}
    >
      <h4>{usser.count.on}</h4>
      <div className="card-info">
        <p>{usser.name}</p>
        <small>
          Total: {usser.messages.off.length + usser.messages.on.length} - Rol:{" "}
          {usser.messages.on.length} - Bonus: {usser.count.bonus}
        </small>
      </div>
    </div>
  );
};

export default Card;

import { useSelector } from "react-redux";
import type { UsserType } from "../../store/slices/resultSlice";
import Card from "../Card/Card";
import "./List.css";
import type { StoreType } from "../../store/store";

const List = ({ results }: { results: UsserType[] }) => {
  const isDetailsOpen = useSelector(
    (state: StoreType) => state.results.isDetailsOpen
  );

  return (
    <div className={`list ${isDetailsOpen ? "details-open" : ""}`}>
      {results.map((result) => (
        <Card key={result.name} usser={result} />
      ))}
    </div>
  );
};

export default List;

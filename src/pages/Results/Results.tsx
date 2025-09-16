import { useSelector } from "react-redux";
import type { StoreType } from "../../store/store";
import "./Results.css";
import Form from "../../components/Form/Form";
import List from "../../components/List/List";
import Details from "../../components/Details/Details";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const results = useSelector((state: StoreType) => state.results);

  const navigate = useNavigate();

  if (results.results.length === 0) {
    navigate("/");
    console.log("No results, redirecting to home...");
  }

  return (
    <section className="results page">
      <h2>🌼 Rol Counter</h2>
      <Form />
      <section className="results-info">
        <List results={results.results} />
        <Details />
      </section>
    </section>
  );
};

export default Results;

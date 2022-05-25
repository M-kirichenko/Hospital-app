import { useState, useContext, useEffect } from "react";
import ApiContext from "../../contexts/ApiContext";
import VisitInputs from "../VisitInputs";
import TokenContext from "../../contexts/TokenContext";

const Visits = () => {
  const api = useContext(ApiContext);
  const [visits, setVisits] = useState([]);
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const allVisits = api.allVisits(token);
    allVisits
      .then((data) => setVisits(data))
      .catch(() => {
        setToken(null);
        localStorage.removeItem("jwt");
      });
  }, [api, setToken, token]);

  if (!visits.length) return "no data...";
  return (
    <main>
      <VisitInputs />
      {visits[0]["patient_name"]}
    </main>
  );
};

export default Visits;
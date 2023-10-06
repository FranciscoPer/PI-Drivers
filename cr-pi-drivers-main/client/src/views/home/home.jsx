import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, clearDriversDetail, getDriversByName, getTeams, setTeamFilter, setSourceFilter, setNameOrder,setBirthdateOrder } from "../../redux/actions";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";

const Home = () => {
  const dispatch = useDispatch();

  const allDrivers = useSelector(state => state.allDrivers);
  const teams = useSelector(state => state.teams);

  const [searchDriver, setSearchDriver] = useState("");
  

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getTeams());
    return () => dispatch(clearDriversDetail());
  }, [dispatch]);

  const handleTeamChange = e => {
    const selectedTeam = e.target.value;
    dispatch(setTeamFilter(selectedTeam)); // Aquí enviamos la acción para filtrar por equipo.
  };

  const handleChange = e => setSearchDriver(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(getDriversByName(searchDriver));
  };

  const handleSourceChange = (e) => {
    const selectedSource = e.target.value;
    dispatch(setSourceFilter(selectedSource));
};

const handleNameOrderChange = (e) => {
  const selectedOrder = e.target.value;
  dispatch(setNameOrder(selectedOrder));
};

const handleBirthdateOrderChange = (e) => {
  dispatch(setBirthdateOrder(e.target.value));
};


return (
  <div style={{ padding: "20px", fontFamily: "Arial" }}>
    <h2>Inicio</h2>
    
    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px" }}>Selecciona un equipo:</label>
      <select onChange={handleTeamChange}>
        <option value="">Todos los equipos</option>
        {teams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>
    </div>
    
    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px" }}>Selecciona una fuente:</label>
      <select onChange={handleSourceChange}>
        <option value="">Todas las fuentes</option>
        <option value="database">Base de Datos</option>
        <option value="api">API</option>
      </select>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px" }}>Ordena por nombre:</label>
      <select onChange={handleNameOrderChange}>
        <option value="">Orden predeterminado</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
    </div>

    <div style={{ marginBottom: "20px" }}>
      <label style={{ marginRight: "10px" }}>Ordena por fecha de nacimiento:</label>
      <select onChange={handleBirthdateOrderChange}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>

    <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
    <Cards allDrivers={allDrivers} />
  </div>
);
};

export default Home;
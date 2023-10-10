import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, clearDriversDetail, getDriversByName, getTeams, setTeamFilter, setSourceFilter, setNameOrder,setBirthdateOrder } from "../../redux/actions";
import Navbar from "../../components/navbar/navbar";
import Cards from "../../components/cards/cards";
import Pagination from "../pagination/pagination";
import "./home.css"

const Home = () => {
  const dispatch = useDispatch();
  const driversPerPage = 9;
  const allDrivers = useSelector(state => state.allDrivers);
  const teams = useSelector(state => state.teams);
  const totalPages = Math.ceil(allDrivers.length / driversPerPage);
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

const [currentPage, setCurrentPage] = useState(1);


const handlePrevPage = () => {
  setCurrentPage(currentPage - 1);
};

const handleNextPage = () => {
  setCurrentPage(currentPage + 1);
};

const indexOfLastDriver = currentPage * driversPerPage;
const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
const currentDrivers = allDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

return (
  <div className="container">
    

    <div className="top-bar">
      <label>Selecciona un equipo:</label>
      <select onChange={handleTeamChange}>
        <option value="">Todos los equipos</option>
        {teams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>

      <label>Selecciona una fuente:</label>
      <select onChange={handleSourceChange}>
        <option value="">Todas las fuentes</option>
        <option value="database">Base de Datos</option>
        <option value="api">API</option>
      </select>

      <label>Ordena por nombre:</label>
      <select onChange={handleNameOrderChange}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <label>Ordena por fecha de nacimiento:</label>
      <select onChange={handleBirthdateOrderChange}>
        <option value="">Orden Predeterminado</option>
        <option value="asc">Fecha de Nacimiento (Ascendente)</option>
        <option value="desc">Fecha de Nacimiento (Descendente)</option>
      </select>
    </div>

    <Navbar handleChange={handleChange} handleSubmit={handleSubmit} />
    <Cards allDrivers={currentDrivers} />
    <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        handlePrevPage={handlePrevPage} 
        handleNextPage={handleNextPage}
    />
  </div>
);
};

export default Home;
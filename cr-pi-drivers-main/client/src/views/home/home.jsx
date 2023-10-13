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

  const handleTeamChange = event => {
    const selectedTeam = event.target.value;
    dispatch(setTeamFilter(selectedTeam));
    setCurrentPage(1); // Aquí enviamos la acción para filtrar por equipo.
  };

  const handleChange = event => setSearchDriver(event.target.value);

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(getDriversByName(searchDriver));
    setCurrentPage(1);
  };

  const handleSourceChange = (event) => {
    const selectedSource = event.target.value;
    dispatch(setSourceFilter(selectedSource));
    setCurrentPage(1);
};

const handleNameOrderChange = (event) => {
  const selectedOrder = event.target.value;
  dispatch(setNameOrder(selectedOrder));
  setCurrentPage(1);
};

const handleBirthdateOrderChange = (event) => {
  dispatch(setBirthdateOrder(event.target.value));
  setCurrentPage(1);
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
      <label>Select Team:</label>
      <select onChange={handleTeamChange}>
        <option value="">All Teams</option>
        {teams.map((team, index) => (
          <option key={index} value={team}>{team}</option>
        ))}
      </select>

      <label>Select a Source:</label>
      <select onChange={handleSourceChange}>
        <option value="">All Sources</option>
        <option value="database">Data Base</option>
        <option value="api">API</option>
      </select>

      <label>Sort by name:</label>
      <select onChange={handleNameOrderChange}>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>

      <label>Sort by birthdate:</label>
      <select onChange={handleBirthdateOrderChange}>
        <option value="">Default Order</option>
        <option value="asc">Birthdate (Ascending)</option>
        <option value="desc">Birthdate (Descending)</option>
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
import "./detail.css"
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import mapDriverDetails from "./helper";

const Detail = () => {
    const { id } = useParams();
    const [driver, setDriver] = useState({});

    useEffect(() => {
        axios(`http://localhost:3001/drivers/${id}`)
        .then(({ data }) => {
           if (data.name || data.name.forename) {
              setDriver(mapDriverDetails(data));  // Usar la función aquí
           } else {
              window.alert('No hay conductores con ese ID');
           }
        })
        .catch(error => {
            console.error("There was an error fetching the driver:", error);
            window.alert('Ocurrió un error al obtener los detalles del conductor.');
        });
     }, [id]);


     return (
        <div className="detail-card">
            <div className="detail-image">
                <img src={driver.image} alt={`${driver.name} ${driver.lastName}`} />
            </div>
            <div className="detail-info">
                <h2>Id: {driver.id}</h2>
                <h2>Name: {`${driver.name} ${driver.lastName}`}</h2>
                <p>Description: {driver.description}</p>
                <p>Nationality: {driver.nationality}</p>
                <p>BirthDate : {driver.birthDate}</p>
                <p>Teams: {driver.teams}</p>
            </div>
        </div>
    )
}

export default Detail;
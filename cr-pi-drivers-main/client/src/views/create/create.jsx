import "./create.css"

import { useState,useEffect } from 'react';
import axios from 'axios';

const Create = () => {
    const initialState = {
        name: '',
        lastName: '',
        nationality: '',
        image: '',
        birthDate: '',
        description: '',    
        teamName: []
    };
    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState(null);
    const [teams, setTeams] = useState([]);
    const handleChange = (e) => {
    if (e.target.name === "teamName") {
        const selectedTeams = [...e.target.options]
            .filter(option => option.selected)
            .map(option => option.value);
        setFormData({ ...formData, teamName: selectedTeams });
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
};
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://localhost:3001/teams');
                setTeams(response.data);
            } catch (error) {
                console.error("Error al obtener los equipos:", error);
            }
        };
        fetchTeams();
    }, []);

    const isValidDate = (d) => {
        return d instanceof Date && !isNaN(d);
    }
    const areFieldsComplete = () => {
        return formData.name && formData.lastName && formData.nationality && formData.image && formData.birthDate;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        const preparedData = { ...formData };
        if (typeof preparedData.image === 'string') {
            preparedData.image = { url: preparedData.image };
        }
    
        // VALIDACIONES
        if (!formData.name || !formData.lastName || !formData.nationality || !formData.image|| !formData.birthDate) {
            alert("All fields are required except description.");
            return;
        }
        
        const isAlphabetical = (str) => /^[a-zA-Z\s]*$/.test(str);
        
        if (!isAlphabetical(formData.name)) {
            alert("The name field can only contain letters and spaces.");
            return;
        }
        
        if (!isAlphabetical(formData.lastName)) {
            alert("The last name field can only contain letters and spaces.");
            return;
        }
        
        if (!isAlphabetical(formData.nationality)) {
            alert("The nationality field can only contain letters and spaces.");
            return;
        }
        
        const date = new Date(formData.birthDate);
        if (!isValidDate(date)) {
            alert("Invalid birthdate format.");
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:3001/', formData); // Verifica esta URL
            console.log(response.data);
                
            // Mostrar mensaje y resetear formulario
            setMessage('Driver creado con éxito');
            setFormData(initialState);
                
            // Quitar mensaje después de 3 segundos
            setTimeout(() => {
                setMessage(null);
            }, 3000);
        } catch (error) {
            console.error("Error al crear el driver: ", error);
    
            // Mostrar mensaje de error del servidor
            if (error.response && error.response.data) {
                console.error("Mensaje del servidor:", error.response.data);
                setMessage(error.response.data.message || 'Error al crear el driver.');
            } else {
                setMessage('Error al crear el driver.');
            }
    
            setTimeout(() => {
                setMessage(null);
            }, 5000);  // Lo mostramos 5 segundos en caso de errores para dar más tiempo de lectura.
        }
    };

    return (
        <div className="create-form-container">
        {message && <div className="message">{message}</div>}
        
        <form onSubmit={handleSubmit}>
            <input name="name" placeholder="First Name" onChange={handleChange} value={formData.name} required />
            <input name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required />
            <input name="nationality" placeholder="Nationality" onChange={handleChange} value={formData.nationality} required />
            <input name="image" placeholder="Image URL" onChange={handleChange} value={formData.image} required />
            <input type="date" name="birthDate" placeholder="Birth Date" onChange={handleChange} value={formData.birthDate} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} value={formData.description}></textarea>
            <label>Team:</label>
            <select name="teamName" value={formData.teamName} onChange={handleChange} multiple >
                <option value="" disabled>Select a team</option>
                {teams.map(team => (
                    <option key={team} value={team}>{team}</option>
                ))}
            </select>
            <button type="submit" disabled={!areFieldsComplete()}>Create Driver</button>
        </form>
    </div>
    )
}

export default Create;
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
        teamName: ''
    };
    const [formData, setFormData] = useState(initialState);
    const [message, setMessage] = useState(null);
    const [teams, setTeams] = useState([]);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const preparedData = { ...formData };
        if (typeof preparedData.image === 'string') {
            preparedData.image = { url: preparedData.image };
        }
    
        // VALIDACIONES
        if (!formData.name || !formData.lastName || !formData.nationality || !formData.image|| !formData.birthDate) {
            alert("Todos los campos son obligatorios, excepto descripción.");
            return;
        }
    
        const isAlphabetical = (str) => /^[a-zA-Z\s]*$/.test(str);
    
        if (!isAlphabetical(formData.name)) {
            alert("El campo nombre solo puede contener letras y espacios.");
            return;
        }
    
        if (!isAlphabetical(formData.lastName)) {
            alert("El campo apellido solo puede contener letras y espacios.");
            return;
        }
    
        if (!isAlphabetical(formData.nationality)) {
            alert("El campo nacionalidad solo puede contener letras y espacios.");
            return;
        }
        
    
        const date = new Date(formData.birthDate);
        if (!isValidDate(date)) {
            alert("Formato de fecha de nacimiento no válido.");
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
            <form onSubmit={handleSubmit}></form>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} required />
                <input name="lastName" placeholder="Apellido" onChange={handleChange} value={formData.lastName} required />
                <input name="nationality" placeholder="Nacionalidad" onChange={handleChange} value={formData.nationality} required />
                <input name="image" placeholder="URL de la imagen" onChange={handleChange} value={formData.image} required />
                <input type="date" name="birthDate" placeholder="Fecha de Nacimiento" onChange={handleChange} value={formData.birthDate} required />
                <textarea name="description" placeholder="Descripción" onChange={handleChange} value={formData.description}></textarea>
                <label>Equipo:</label>
<select name="teamName" value={formData.teamName} onChange={handleChange}>
    <option value="" disabled>Selecciona un equipo</option>
    {teams.map(team => (
        <option key={team} value={team}>{team}</option>
    ))}
</select>
                <button type="submit">Crear Driver</button>
            </form>
        </div>
    )
}

export default Create;
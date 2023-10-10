import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const images = useMemo(() => [
        "https://wallpapercave.com/wp/wp11357122.png",
        "https://images6.alphacoders.com/697/697533.jpg",
        "https://images8.alphacoders.com/516/516195.jpg",
        "https://images5.alphacoders.com/317/317664.jpg",
        "https://images5.alphacoders.com/116/1166226.jpg"
    ], []); 
    
    const nextImage = useCallback(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images]);
    
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const timer = setTimeout(nextImage, 5000);
        return () => clearTimeout(timer);
    }, [currentImageIndex, nextImage]);

    return (
        <div className="carousel-container">
            <img src={images[currentImageIndex]} alt="carousel" className="carousel-image" />
            <button onClick={prevImage} className="carousel-button prev">←</button>
            <button onClick={nextImage} className="carousel-button next">→</button>
            <Link to="/home" className="home-button">Ir al Inicio</Link>
        </div>
    );
};

export default Landing;
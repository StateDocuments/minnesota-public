import React, { useState } from 'react';
import './styles.css';

const App = () => {
    const [images, setImages] = useState([]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImages([...images, e.target.result]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="app-container">
            <header className="header">
                Image Gallery
            </header>

            <main className="main">
                <div className="image-grid">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Uploaded ${index}`} className="image" />
                    ))}
                </div>

                <label htmlFor="fileInput" className="button">
                    Add Image
                </label>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                />
            </main>

            <footer className="footer">
                © 2025 Image Gallery App
            </footer>
        </div>
    );
};

export default App;

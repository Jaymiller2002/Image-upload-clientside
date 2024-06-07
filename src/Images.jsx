import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from './context';
import { getImages, updateImage } from './api';
import './App.css'

const Images = () => {
    const [images, setImages] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.accessToken) {
            getImages({ auth })
                .then((response) => {
                    console.log('GET IMAGES: RESPONSE', response);
                    setImages(response.data);
                })
                .catch(error => console.log('ERROR: ', error));
        }
    }, [auth.accessToken]);

    const handleUpdateImage = (imageId, updatedData) => {
        updateImage({ auth, imageId, imageData: updatedData })
            .then((response) => {
                console.log('UPDATE IMAGE: RESPONSE', response);
                // Assuming you want to update the state with the updated image
                const updatedImages = images.map(image => {
                    if (image.id === imageId) {
                        return response.data;
                    }
                    return image;
                });
                setImages(updatedImages);
            })
            .catch(error => console.log('ERROR: ', error));
    };

    // const handleDeleteImage = (imageId) => {
    //     deleteImage({ auth, imageId })
    //         .then(() => {
    //             console.log('DELETE IMAGE: SUCCESS');
    //             // Filter out the deleted image from the images state
    //             const filteredImages = images.filter(image => image.id !== imageId);
    //             setImages(filteredImages);
    //         })
    //         .catch(error => console.log('ERROR: ', error));
    // };

    return (
        <div className="images-container" style={{ marginTop: '20px' }}>
            {images && images.map(image => (
                <div key={image.id} className="image-card">
                    <h4 className="image-title">{image.title}</h4>
                    <img 
                        src={`http://127.0.0.1:8000${image.image}`}
                        alt={image.title}
                    />
                    <div className="button-container">
                        <button onClick={() => handleUpdateImage(image.id, { /* Updated data */ })}>Update</button>
                        <button onClick={() => handleDeleteImage(image.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Images;

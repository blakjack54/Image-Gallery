import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function Image({ url }) {
  return (
    <div className="image">
      <img src={url} alt="Gallery" />
    </div>
  );
}

function App() {
  const [images, setImages] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    const file = e.target.elements.imageInput.files[0];
    const formData = new FormData();
    formData.append('image', file);

    // Example fetch code (replace with your actual backend endpoint)
    fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => setImages([...images, data.imageUrl]))
    .catch(error => console.error('Error uploading image:', error));
  };

  return (
    <div>
      <div id="gallery">
        {images.map((image, index) => (
          <Image key={index} url={image} />
        ))}
      </div>
      <form id="uploadForm" onSubmit={handleUpload}>
        <input type="file" id="imageInput" accept="image/*" required />
        <button type="submit">Upload Image</button>
      </form>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('gallery'));

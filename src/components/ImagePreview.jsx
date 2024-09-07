const ImagePreview = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file instanceof File);

    if (validFiles.length > 0) {
      // Si hay archivos seleccionados, convertirlos a URLs temporales
      setImages(validFiles.map(file => URL.createObjectURL(file)));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {images.map((image, index) => {
          // Verifica si es una URL o un File convertido a URL
          const isURL = typeof image === 'string' && (image.startsWith('http') || image.startsWith('blob'));

          return (
            <img
              key={index}
              src={isURL ? image : URL.createObjectURL(image)}  // Si es un archivo, lo convierte a URL
              alt={`Preview ${index}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImagePreview;

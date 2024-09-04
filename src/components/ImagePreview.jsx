const ImagePreview = ({ images, setImages }) => {
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Preview ${index}`}
           style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;

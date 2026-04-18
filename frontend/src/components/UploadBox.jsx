import { useState } from "react";

function UploadBox({ setImageFile }) {
  const [preview, setPreview] = useState(null);

  const handleFile = (file) => {
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {!preview ? (
        <div
          className="upload-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <p>Drag & drop image here</p>
          <p style={{ fontSize: "12px", opacity: 0.7 }}>
            or click to upload
          </p>

          <input type="file" accept="image/*" onChange={handleChange} />
        </div>
      ) : (
        <div className="preview-box">
          <img src={preview} alt="preview" />

          <button
            className="remove-btn"
            onClick={() => {
              setPreview(null);
              setImageFile(null);
            }}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
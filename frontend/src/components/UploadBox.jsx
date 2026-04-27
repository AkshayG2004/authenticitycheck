import { useState } from "react";

function UploadBox() {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFile = (file) => {
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
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

  const handleAnalyze = async () => {
    if (!imageFile) {
      alert("Please upload an image first");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();
      formData.append("image", imageFile);
      formData.append("caption", caption);

      const response = await fetch("https://authenticitycheck.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      // small delay for smooth UX (feels intentional, not instant jump)
      setTimeout(() => {
        setResult(data);
        setLoading(false);
      }, 600);

    } catch (error) {
      console.error(error);

      setResult({
        status: "Error",
        confidence: "0%",
        reasons: ["Something went wrong. Try again."],
      });

      setLoading(false);
    }
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
              setResult(null);
            }}
          >
            ✕
          </button>
        </div>
      )}

      <textarea
        placeholder="Enter image caption (optional)..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {/* 🔥 BUTTON WITH SPINNER */}
      <button
        className="analyze-btn"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? <span className="loader"></span> : "Analyze Image"}
      </button>

      {/* 🔥 RESULT WITH FADE-IN */}
      {result && (
        <div className="result-box fade-in" style={{ marginTop: "20px" }}>
          <h3
            style={{
              color:
                result.status === "Authentic Image"
                  ? "#22c55e"
                  : result.status === "AI-Generated Content"
                  ? "#f59e0b"
                  : result.status === "Digitally Manipulated Image"
                  ? "#ef4444"
                  : "#94a3b8",
            }}
          >
            {result.status}
          </h3>

          <p>Confidence: {result.confidence}</p>

          <ul style={{ marginTop: "10px", textAlign: "left" }}>
            {result.reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadBox;
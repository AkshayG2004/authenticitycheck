import { useState } from "react";
import UploadBox from "../components/UploadBox";
import CaptionInput from "../components/CaptionInput";

function Home() {
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");

  const handleAnalyze = () => {
    if (!imageFile) {
      alert("Please upload an image");
      return;
    }
    console.log("Image:", imageFile);
    console.log("Caption:", caption);
  };

  return (
    <div className="container">
      <h1 className="title">AuthenticityCheck AI</h1>
      <p className="subtitle">
        Detect manipulated images and verify authenticity using AI
      </p>

      <div className="card">
        <UploadBox setImageFile={setImageFile} />
        <CaptionInput caption={caption} setCaption={setCaption} />

        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze Image
        </button>
      </div>
    </div>
  );
}

export default Home;
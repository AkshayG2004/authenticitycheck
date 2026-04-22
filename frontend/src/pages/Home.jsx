import UploadBox from "../components/UploadBox";

function Home() {
  return (
    <div className="container">
      <h1 className="title">AuthenticityCheck AI</h1>

      <p className="subtitle">
        Detect manipulated images and verify authenticity using AI
      </p>

      <div className="card">
        <UploadBox />
      </div>
    </div>
  );
}

export default Home;
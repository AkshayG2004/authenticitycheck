import "./about.css";

function About() {
  return (
    <div className="about-container">

      {/* 🎥 Background Video */}
      <video autoPlay loop muted className="about-video">
        <source src="/about-bg.mp4.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Overlay (for readability) */}
      <div className="about-overlay"></div>

      {/* 📄 Content */}
      <div className="about-content">
        <h1>About AuthenticityCheck AI</h1>

        <p>
          In today’s digital world, information spreads faster than ever.
        </p>

        <p className="highlight">
          But not everything we see is real.
        </p>

        <p>
          AI-generated and manipulated content spreads misinformation,
          making it harder to verify what is genuine.
        </p>

        <p>
          Like stars in space, data is everywhere, but the truth is often hidden.
        </p>

        <p className="final">
          Our goal is to help you identify what’s authentic and trust what you see.
        </p>
      </div>

    </div>
  );
}

export default About;
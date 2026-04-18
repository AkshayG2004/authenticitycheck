function CaptionInput({ caption, setCaption }) {
  return (
    <div className="caption-container">
      <textarea
        placeholder="Enter image caption (optional)..."
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
    </div>
  );
}

export default CaptionInput;
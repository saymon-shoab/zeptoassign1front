import React, { useState, useEffect } from "react";

const FontList = () => {
  const [fontName, setFontName] = useState("");
  const [fonts, setFonts] = useState(() => {
    const stored = localStorage.getItem("fonts");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    fonts.forEach((font) => {
      const linkId = `font-${font.replace(/\s+/g, "-")}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, "+")}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    });
  }, [fonts]);

  const handleAddFont = (e) => {
    e.preventDefault();
    const trimmed = fontName.trim();
    if (trimmed && !fonts.includes(trimmed)) {
      const updated = [...fonts, trimmed];
      setFonts(updated);
      localStorage.setItem("fonts", JSON.stringify(updated));
    }
    setFontName("");
  };

  const handleDeleteFont = (fontToRemove) => {
    const updated = fonts.filter((font) => font !== fontToRemove);
    setFonts(updated);
    localStorage.setItem("fonts", JSON.stringify(updated));
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Font List</h2>
      <form className="row g-3 mb-4" onSubmit={handleAddFont}>
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Enter font name (e.g. Roboto)"
            value={fontName}
            onChange={(e) => setFontName(e.target.value)}
            required
          />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">
            Add Font
          </button>
        </div>
      </form>

      <table className="table table-bordered table-hover bg-white">
        <thead className="table-dark">
          <tr>
            <th>Font Name</th>
            <th>Example Style</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fonts.map((font) => (
            <tr key={font}>
              <td>{font}</td>
              <td
                style={{
                  fontFamily: `'${font}', sans-serif`,
                  fontSize: "1.2rem",
                }}
              >
                This is a preview of {font}
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteFont(font)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {fonts.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center text-muted">
                No fonts added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FontList;

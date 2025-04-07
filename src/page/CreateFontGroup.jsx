import { useState } from "react";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";

const CreateFontGroup = () => {
  const [fonts, setFonts] = useState([""]); // Start with one empty font
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");

  const handleFontChange = (value, index) => {
    const updatedFonts = [...fonts];
    updatedFonts[index] = value;
    setFonts(updatedFonts);
  };

  const addFontRow = () => {
    setFonts([...fonts, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedFonts = fonts.filter((font) => font.trim() !== "");

    if (!groupName.trim()) {
      return setError("Please enter a group name.");
    }

    if (selectedFonts.length < 2) {
      return setError("You must select at least two fonts to create a group.");
    }

    // Save group to localStorage or send to backend
    const newGroup = {
      groupName,
      fonts: selectedFonts,
      createdAt: new Date().toISOString(),
    };

    const existingGroups = JSON.parse(localStorage.getItem("fontGroups")) || [];
    localStorage.setItem("fontGroups", JSON.stringify([...existingGroups, newGroup]));

    // Clear form
    setGroupName("");
    setFonts([""]);
    setError("");
    alert("Font group created successfully!");
  };

  return (
    <div className="container mt-4">
      <h3>Create Font Group</h3>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Group Name</Form.Label>
          <Form.Control
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
          />
        </Form.Group>

        <Form.Label>Fonts</Form.Label>
        {fonts.map((font, index) => (
          <Row key={index} className="mb-2">
            <Col>
              <Form.Control
                type="text"
                value={font}
                placeholder={`Font ${index + 1}`}
                onChange={(e) => handleFontChange(e.target.value, index)}
              />
            </Col>
          </Row>
        ))}

        <div className="d-flex gap-3">
          <Button variant="secondary" onClick={addFontRow}>
            Add Row
          </Button>
          <Button variant="primary" type="submit">
            Create Group
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateFontGroup;

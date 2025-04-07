import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FontGroup = () => {
  const [fontGroups, setFontGroups] = useState(() => {
    const stored = localStorage.getItem("fontGroups");
    return stored ? JSON.parse(stored) : [];
  });
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupFonts, setGroupFonts] = useState("");

  useEffect(() => {
    // Load fonts for preview
    fontGroups.forEach((group) => {
      const firstFont = group.fonts[0];
      const linkId = `font-${firstFont.replace(/\s+/g, "-")}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.href = `https://fonts.googleapis.com/css2?family=${firstFont.replace(/\s+/g, "+")}&display=swap`;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
    });
  }, [fontGroups]);

  const openModalForEdit = (index) => {
    setEditingIndex(index);
    setGroupName(fontGroups[index].name);
    setGroupFonts(fontGroups[index].fonts.join(", "));
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updated = fontGroups.filter((_, i) => i !== index);
    setFontGroups(updated);
    localStorage.setItem("fontGroups", JSON.stringify(updated));
  };

  const handleSave = () => {
    const updatedGroup = {
      name: groupName,
      fonts: groupFonts.split(",").map((f) => f.trim()).filter(Boolean),
    };

    const updatedGroups = [...fontGroups];
    updatedGroups[editingIndex] = updatedGroup;

    setFontGroups(updatedGroups);
    localStorage.setItem("fontGroups", JSON.stringify(updatedGroups));
    setShowModal(false);
    setEditingIndex(null);
  };

  return (
    <div className="container mt-5">
         <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Font Group List</h2>
        <Button variant="primary" onClick={() => navigate("/create-font-group")}>
          Create Font Group
        </Button>
      </div>


      <Table bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Group Name</th>
            <th>Example Style</th>
            <th>Font Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {fontGroups.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No font groups available.
              </td>
            </tr>
          ) : (
            fontGroups.map((group, index) => (
              <tr key={index}>
                <td>{group.name}</td>
                <td style={{ fontFamily: `'${group.fonts[0]}', sans-serif` }}>
                  Preview with {group.fonts[0]}
                </td>
                <td>{group.fonts.length}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => openModalForEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Font Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Fonts (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={groupFonts}
                onChange={(e) => setGroupFonts(e.target.value)}
                placeholder="Roboto, Open Sans, Lato"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FontGroup;

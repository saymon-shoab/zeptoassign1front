import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { getFontGroups, deleteFontGroup, updateFontGroupName } from '../services/api';

const FontGroupList = ({ refreshTrigger }) => {
  const [fontGroups, setFontGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState('');
  const [updating, setUpdating] = useState(false);

  const loadFontGroups = async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getFontGroups();
      setFontGroups(result.data || result);
    } catch (err) {
      setError(err.message || 'Failed to load font groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFontGroups();
  }, [refreshTrigger]);

  const handleEdit = (group) => {
    setEditingGroup(group);
    setNewGroupName(group.groupName || group.name);
    setShowEditModal(true);
  };

  const handleUpdateGroup = async () => {
    if (!newGroupName.trim()) {
      return;
    }

    setUpdating(true);
    try {
      await updateFontGroupName(editingGroup._id || editingGroup.id, newGroupName.trim());
      
      // Update local state
      setFontGroups(groups => 
        groups.map(group => 
          (group._id || group.id) === (editingGroup._id || editingGroup.id)
            ? { ...group, groupName: newGroupName.trim(), name: newGroupName.trim() }
            : group
        )
      );
      
      setShowEditModal(false);
      setEditingGroup(null);
      setNewGroupName('');
    } catch (err) {
      setError(err.message || 'Failed to update group name');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (groupId) => {
    if (!window.confirm('Are you sure you want to delete this font group?')) {
      return;
    }

    try {
      await deleteFontGroup(groupId);
      
      // Update local state
      setFontGroups(groups => groups.filter(group => (group._id || group.id) !== groupId));
    } catch (err) {
      setError(err.message || 'Failed to delete font group');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading font groups...</p>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h3>Font Groups</h3>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {fontGroups.length === 0 ? (
        <Alert variant="info">
          No font groups created yet. Create your first font group above!
        </Alert>
      ) : (
        <Table bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Group Name</th>
              <th>Fonts</th>
              <th>Font Count</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fontGroups.map((group) => (
              <tr key={group._id || group.id}>
                <td>
                  <strong>{group.groupName || group.name}</strong>
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-1">
                    {(group.fonts || []).map((font, index) => (
                      <Badge 
                        key={index} 
                        bg="secondary"
                        className="font-badge"
                      >
                        {font.fontName || font.name || `Font ${index + 1}`}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td>
                  <Badge bg="primary">
                    {(group.fonts || []).length} fonts
                  </Badge>
                </td>
                <td>
                  {group.createdAt 
                    ? new Date(group.createdAt).toLocaleDateString()
                    : 'N/A'
                  }
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => handleEdit(group)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(group._id || group.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Font Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Enter new group name"
                disabled={updating}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => setShowEditModal(false)}
            disabled={updating}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpdateGroup}
            disabled={updating || !newGroupName.trim()}
          >
            {updating ? 'Updating...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FontGroupList;
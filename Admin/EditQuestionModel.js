// EditQuestionModal.js
import React, { useState } from 'react';

const EditQuestionModal = ({ question, onSave, onCancel, subjects, selectedSubject, onSubjectChange }) => {
  const [editedQuestion, setEditedQuestion] = useState({ ...question });

  const handleSave = () => {
    // Validate the editedQuestion if needed

    // Call the onSave function with the edited question
    onSave(editedQuestion);

    // Close the modal
    onCancel();
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-center">Edit Question</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label>Choose Subject:</label>
              <select
                className="form-control"
                value={selectedSubject}
                onChange={(e) => onSubjectChange(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Question:</label>
              <textarea
                className="form-control"
                rows="3"
                value={editedQuestion.question}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, question: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Correct Answer:</label>
              <input
                type="text"
                className="form-control"
                value={editedQuestion.correctAnswer}
                onChange={(e) => setEditedQuestion({ ...editedQuestion, correctAnswer: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Options (comma-separated):</label>
              <input
                type="text"
                className="form-control"
                value={editedQuestion.options.join(', ')} // Combine options into a comma-separated string
                onChange={(e) => setEditedQuestion({ ...editedQuestion, options: e.target.value.split(', ') })}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;

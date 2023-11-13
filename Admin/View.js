import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import EditQuestionModal from './EditQuestionModal';

const View = () => {
  const [questions, setQuestions] = useState([]);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(''); // Add a state for the selected subject
  const subjects = ['Java', 'C', 'HTML', 'CSS', 'React']; // Replace this with your actual subject list

  useEffect(() => {
    // Fetch the questions from your API when the component mounts
    fetch('http://localhost:8000/api/questions')
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }, []);

  const handleDelete = (id) => {
    // Send a DELETE request to your backend to delete the question
    fetch(`http://localhost:8000/api/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Update the local state to reflect the deletion
        setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
      })
      .catch((error) => console.error('Error deleting question:', error));
  };

  const handleEdit = (question) => {
    // Set the question to be edited
    setEditingQuestion(question);
  };

  const handleSaveEdit = (editedQuestion) => {
    // Send a PUT request to update the question in the backend
    fetch(`http://localhost:8000/api/questions/${editedQuestion.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedQuestion),
    })
      .then(() => {
        // Update the local state to reflect the edited question
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) => (question.id === editedQuestion.id ? editedQuestion : question))
        );

        // Clear the editing state
        setEditingQuestion(null);
      })
      .catch((error) => console.error('Error editing question:', error));
  };

  return (
    <div>
      <Navbar />
      <h2 className='text-center'>Admin View - Questions</h2>
      <table className="table">
        {/* ... Table headers ... */}
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.question}</td>
              <td>{question.correctAnswer}</td>
              <td>{question.options.join(', ')}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(question)}>
                  Edit
                </button>
                <button className="btn btn-danger mx-3" onClick={() => handleDelete(question.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingQuestion && (
        <div>
          <EditQuestionModal
            subjects={subjects}
            selectedSubject={selectedSubject}
            onSubjectChange={setSelectedSubject}
            question={editingQuestion}
            onSave={handleSaveEdit}
            onCancel={() => setEditingQuestion(null)}
          />
        </div>
      )}
    </div>
  );
};

export default View;

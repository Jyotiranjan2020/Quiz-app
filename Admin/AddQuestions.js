import { toast } from "react-toastify";
import React, { useState } from 'react';
import Navbar from "./Navbar";

const AddQuestion = () => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newQuestion = {
      question,
      correctAnswer,
      options: [correctAnswer, option1, option2, option3].filter(Boolean), // Remove empty options
    };

    // Send a POST request to your API to add the question
    try {
      const response = await fetch('http://localhost:8000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

    //   if (response.status === 201) {
        // Question added successfully
       
        // Clear the form
        setQuestion('');
        setCorrectAnswer('');
        setOption1('');
        setOption2('');
        setOption3('');
    //   } else {
        toast.success("Question added successfully!");
    //   }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (<>
   <div>
    <Navbar/>
   </div>
    <div className="offset-lg-3 col-lg-6 mt-3">
      <h2 className="text-center">Add a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Question:</label>
          <textarea
            className="form-control"
            rows="3"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Correct Answer:</label>
          <input
            type="text"
            className="form-control"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Option 1:</label>
          <input
            type="text"
            className="form-control"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Option 2:</label>
          <input
            type="text"
            className="form-control"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Option 3:</label>
          <input
            type="text"
            className="form-control"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Add Question
        </button>
      </form>
    </div></>
  );
};

export default AddQuestion;


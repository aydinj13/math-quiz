import React, { useState } from "react";
import './App.css'

function App() {
  const max = 10
  const generateRandomNumbers = () => ({
    num1: Math.floor(Math.random() * max),
    num2: Math.floor(Math.random() * max)
  })
  
  const [numbers, setNumbers] = useState(generateRandomNumbers())
  const [questions, setQuestions] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [inputValue, setInputValue] = useState('');
  


  const handleSubmit = (e) => {
    e.preventDefault(); 
    setQuestions(questions + 1);
    
    if (parseInt(inputValue) === numbers.num1 + numbers.num2) {
      setCorrect(correct + 1);
    }

    setInputValue(''); 
    setNumbers(generateRandomNumbers()); 
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFinish = () => {
    // Example action: Alert the results and reset the quiz
    alert(`You attempted ${questions} questions and got ${correct} correct.`);
    setQuestions(0);
    setCorrect(0);
    setNumbers(generateRandomNumbers());
  };

  return (
    <div className="app-container">
    <h2 className="question">{numbers.num1} + {numbers.num2}</h2>
    <p>Questions attempted: {questions}</p>
    <p>Questions correct: {correct}</p>
    <form onSubmit={handleSubmit}>
    <input type="number" value={inputValue} onChange={handleInputChange} id="input"></input>
    <button type="button" className="button" onClick={handleFinish}>Finish</button>
    </form>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
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
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  
  useEffect(() => {
    fetchLeaderboardData();
  }, []);
  
  const postScore = (playerName, score) => {
    fetch('http://127.0.0.1:8000/leaderboard/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ player_name: playerName, score: score }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Score submitted:', data);
      fetchLeaderboardData(); // Refresh the leaderboard
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  const fetchLeaderboardData = () => {
    fetch('http://127.0.0.1:8000/leaderboard/')
      .then(response => response.json())
      .then(data => {
        setLeaderboard(data);
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
      });
  };

  const toggleLeaderboard = () => {
    setShowLeaderboard(!showLeaderboard);
  };


  const handleFinish = () => {
    alert(`You attempted ${questions} questions and got ${correct} correct.`);
    
    // Call postScore to send data to the backend
    postScore("PlayerName", correct); // Replace "PlayerName" with actual player name if available
  
    setQuestions(0);
    setCorrect(0);
    setNumbers(generateRandomNumbers());
  };
  
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



  return (
    <div className="app-container">
    <h2 className="question">{numbers.num1} + {numbers.num2}</h2>
    <p>Questions attempted: {questions}</p>
    <p>Questions correct: {correct}</p>
    <form onSubmit={handleSubmit}>
    <input type="number" value={inputValue} onChange={handleInputChange} id="input"></input>
    <button type="button" className="button" onClick={handleFinish}>Finish</button>
    </form>

    <button onClick={toggleLeaderboard} className="button">
        {showLeaderboard ? 'Hide Leaderboard' : 'Show Leaderboard'}
      </button>

      {showLeaderboard && (
        <div className="leaderboard">
          <h3>Leaderboard</h3>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={index}>{entry.player_name}: {entry.score}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;

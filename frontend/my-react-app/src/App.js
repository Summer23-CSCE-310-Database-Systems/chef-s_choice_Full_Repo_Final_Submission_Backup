import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  // Define a function to fetch data from the backend API
  const fetchDataFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/users'); // Make a GET request to your backend API
      const data = await response.json(); // Parse the response as JSON
      console.log(data); // Output the fetched data to the console (you can update this to update your UI with the data)
    } catch (error) {
      console.error('Error fetching data from the backend:', error);
    }
  };

  // Call the fetch function when the component mounts or when you want to trigger the request
  // For example, you can call it inside a button click event, useEffect, or any other event.
  fetchDataFromBackend();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
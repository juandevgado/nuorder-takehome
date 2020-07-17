import React from 'react';
import { getSuggestions } from './API';
// Components
import AutoComplete from './components/AutoComplete';
// Styles
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>NuORDER Take Home</h1>
      <AutoComplete
        getSuggestions={getSuggestions}
      />
    </div>
  );
}

export default App;

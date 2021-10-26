import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetFilter from './components/PlanetFilter';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <PlanetFilter />
        <Table />
      </Provider>
    </div>
  );
}

export default App;

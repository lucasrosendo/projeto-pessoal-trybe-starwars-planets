import React from 'react';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Sort from '../components/Sort';

function Home() {
  return (
    <main className="app-container">
      <SearchBar />
      <Sort />
      <Filters />
      <Table />
    </main>
  );
}

export default Home;

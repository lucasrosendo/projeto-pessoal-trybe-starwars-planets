import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const INITIAL_FILTER = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};
function Provider({ children }) {
  const [statewars, setStatewars] = useState([]);
  const [filterwars, setfilterWars] = useState(INITIAL_FILTER);
  useEffect(() => {
    const response = async () => {
      const api = 'https://swapi-trybe.herokuapp.com/api/planets/';

      const { results } = await fetch(api).then((result) => result.json());

      results.forEach((item) => {
        delete item.residents;
      });

      setStatewars(results);
    };

    response();
  }, []);
  const planetContexValue = { statewars, filterwars, setfilterWars };
  return (
    <MyContext.Provider value={ planetContexValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;

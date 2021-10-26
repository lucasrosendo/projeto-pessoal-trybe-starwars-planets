import React, { useContext, useState } from 'react';
import MyContext from '../context/MyContext';

const selects = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const comparators = [
  'maior que',
  'menor que',
  'igual a',
];

const INITIAL_FILTER = {
  column: 'population',
  comparison: 'maior que',
  value: '0',
};

function PlanetFilter() {
  const { filterwars, setfilterWars } = useContext(MyContext);
  const [initialFilters, setInitialFilters] = useState(INITIAL_FILTER);
  const [select, setSelect] = useState(selects);
  const [comparisons] = useState(comparators);
  const filterInput = ({ target: { value } }) => {
    setfilterWars({ ...filterwars,
      filterByName: { ...filterwars.filterByName, name: value } });
    console.log(filterwars);
  };
  const handleChange = ({ target: { id, value } }) => {
    setInitialFilters({ ...initialFilters, [id]: value });
    console.log(filterwars);
  };
  const handleSubmit = () => {
    const { column, comparison, value } = initialFilters;

    const obj = { column, comparison, value };

    const result = select
      .filter((i) => i !== obj.column);
    setSelect(result);

    setfilterWars({ ...filterwars,
      filterByNumericValues: [...filterwars.filterByNumericValues, obj],
    });

    setInitialFilters({ ...initialFilters,
      column: select.length ? select[0] : '',
      value: '0',
    });
    document.getElementById('value').value = '';
  };
  return (
    <div>
      <label htmlFor="name">
        Procurar Planeta:
        <input
          data-testid="name-filter"
          type="text"
          id="name"
          onChange={ filterInput }
        />
      </label>

      <label htmlFor="column">
        Ordenar po categoria:
        <select
          data-testid="column-filter"
          name="column"
          onChange={ handleChange }
          id="column"
        >
          {select.map((i) => <option key={ i }>{i}</option>)}
        </select>
      </label>
      <label htmlFor="comparison">
        Comparação:
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          onChange={ handleChange }
        >
          {comparisons.map((i) => <option key={ i }>{i}</option>)}
        </select>
      </label>
      <label htmlFor="value">
        <input
          id="value"
          type="number"
          data-testid="value-filter"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        onClick={ handleSubmit }
        data-testid="button-filter"
      >
        Ordenar
      </button>
    </div>
  );
}

export default PlanetFilter;

import React, { useContext, useState, useEffect } from 'react';
import Context from '../context/MyContext';

function SearchBar() {
  const columnOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];
  const { filters, setFilters } = useContext(Context);
  const { filterByName: { name }, filterByNumericValues } = filters;
  const [activeFilter, setActiveFilter] = useState(columnOptions);
  const [formFilter, setFormFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  };

  const formHandleChange = ({ target: { name: n, value } }) => {
    setFormFilter({ ...formFilter, [n]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, formFilter],
    });
  };

  useEffect(() => {
    const usedFilters = filterByNumericValues.map(({ column }) => column);
    let filteredColumns = [...columnOptions];
    usedFilters.forEach((usedFilter) => {
      filteredColumns = filteredColumns
        .filter((filColumn) => filColumn !== usedFilter);
    });
    setFormFilter((prevFilter) => ({
      ...prevFilter, column: filteredColumns[0],
    }));
    setActiveFilter(filteredColumns);
  }, [filterByNumericValues]);

  return (
    <div>
      <label htmlFor="name-filter">
        Procurar
        <input
          id="name-filter"
          data-testid="name-filter"
          placeholder="Planet name"
          value={ name }
          onChange={ handleChange }
        />
      </label>
      <form onSubmit={ handleSubmit }>
        <select
          data-testid="column-filter"
          name="column"
          value={ formFilter.column }
          onChange={ formHandleChange }
        >
          {activeFilter.map((columnOption) => (
            <option key={ columnOption } value={ columnOption }>{columnOption}</option>))}
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ formHandleChange }
          value={ formFilter.comparison }
        >
          {comparisonOptions.map((compOption) => (
            <option key={ compOption } value={ compOption }>{compOption}</option>
          ))}
        </select>
        <label htmlFor="population-filter">
          <input
            id="population-filter"
            data-testid="value-filter"
            type="number"
            name="value"
            value={ formFilter.value }
            onChange={ formHandleChange }
          />
        </label>
        <button
          data-testid="button-filter"
          type="submit"
        >
          Filtrar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

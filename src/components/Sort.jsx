import React, { useContext, useState } from 'react';
import Context from '../context/MyContext';

function Sort() {
  const { filters, setFilters } = useContext(Context);
  const [formSort, setFormSort] = useState({
    column: 'population',
    sort: '',
  });
  const columnOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const handleChange = ({ target: { name, value } }) => (
    setFormSort({
      ...formSort,
      [name]: value,
    })
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setFilters({
      ...filters,
      order: formSort,
    });
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="order">
        Order:
        <select
          data-testid="column-sort"
          id="order"
          name="column"
          onChange={ handleChange }
          value={ formSort.column }
        >
          {columnOptions.map((columnOpt) => (
            <option
              key={ columnOpt }
              value={ columnOpt }
            >
              {columnOpt}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="asc">
        Ascendant
        <input
          id="asc"
          type="radio"
          name="sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="desc">
        Descendant
        <input
          id="desc"
          type="radio"
          name="sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleChange }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="submit"
      >
        Order
      </button>
    </form>
  );
}

export default Sort;

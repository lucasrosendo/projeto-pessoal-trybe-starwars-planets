import React, { useContext } from 'react';
import Context from '../context/MyContext';

function Table() {
  const { state: { planets }, filters } = useContext(Context);
  const { filterByName: { name }, filterByNumericValues, order } = filters;
  const { column: columnSort, sort } = order;

  const renderTableHeaders = () => (
    <thead>
      <tr>
        <th>Name</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
        <th>Diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface Water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
    </thead>
  );

  const handleSort = () => {
    const sortPlanets = [...planets];
    if (sort === 'ASC') {
      sortPlanets.sort(({ [columnSort]: a }, { [columnSort]: b }) => (
        new Intl.Collator('en', { numeric: true }).compare(a, b)));
    }
    if (sort === 'DESC') {
      sortPlanets.sort(({ [columnSort]: a }, { [columnSort]: b }) => (
        new Intl.Collator('en', { numeric: true }).compare(b, a)));
    }
    return sortPlanets;
  };

  const handleFilter = () => {
    let filteredPlanets = handleSort();
    if (name) {
      filteredPlanets = filteredPlanets
        .filter((planet) => planet.name.toLowerCase().includes(name.toLowerCase()));
    }
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((filter) => {
        const { column, comparison, value } = filter;
        filteredPlanets = filteredPlanets
          .filter((planet) => {
            switch (comparison) {
            case 'maior que':
              return Number(planet[column]) > Number(value);

            case 'igual a':
              return Number(planet[column]) === Number(value);

            case 'menor que':
              return Number(planet[column]) < Number(value);

            default: return true;
            }
          });
      });
    }
    return filteredPlanets;
  };

  const renderTableBody = () => (
    <tbody>
      {handleFilter().map((planet) => (
        <tr
          key={ planet.name }
        >
          <td data-testid="planet-name">{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>{planet.films}</td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>))}
    </tbody>
  );

  return (
    <div className="table-container">
      <table className="table">
        {renderTableHeaders()}
        {renderTableBody()}
      </table>
    </div>
  );
}

export default Table;

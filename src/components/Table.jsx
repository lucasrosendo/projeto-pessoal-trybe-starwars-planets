import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function PlanetTable() {
  const { statewars, filterwars } = useContext(MyContext);

  const comparado = {
    'maior que': (a, b) => (a > b),
    'menor que': (a, b) => (a < b),
    'igual a': (a, b) => (a === b),
  };
  const THead = () => {
    if (statewars.length) {
      const keys = Object.keys(statewars[0]);
      return (
        <thead>
          <tr>
            {keys.map((i) => {
              const classheaderID = `${i}`;
              return (
                <th className={ classheaderID } key={ i }>{i}</th>
              );
            })}
          </tr>
        </thead>
      );
    }
  };

  const TBody = (mapfilterresult = statewars) => {
    if (mapfilterresult.length) {
      return (
        <tbody>

          {mapfilterresult.map((i) => {
            const classplanet = `${i.name}`.replace(/\s/g, '');
            return (
              <tr key={ i.name }>
                <td className={ classplanet }>{i.name}</td>
                <td className={ classplanet }>{i.rotation_period}</td>
                <td className={ classplanet }>{i.orbital_period}</td>
                <td className={ classplanet }>{i.diameter}</td>
                <td className={ classplanet }>{i.climate}</td>
                <td className={ classplanet }>{i.gravity}</td>
                <td className={ classplanet }>{i.terrain}</td>
                <td className={ classplanet }>{i.surface_water}</td>
                <td className={ classplanet }>{i.population}</td>
                <td className={ classplanet }>{i.films}</td>
                <td className={ classplanet }>{i.created}</td>
                <td className={ classplanet }>{i.edited}</td>
                <td className={ classplanet }>{i.url}</td>
              </tr>
            );
          })}

        </tbody>
      );
    }
  };

  const columnFilter = (statewar = statewars) => {
    const { filterByNumericValues } = filterwars;

    let itemFilter = statewar;

    if (filterByNumericValues.length) {
      filterByNumericValues
        .filter(({ column, comparison, value }) => {
          itemFilter = itemFilter.filter((sec) => {
            const re = comparado[comparison](parseInt(sec[
              column], 10), parseInt(value, 10));
            return re;
          });

          return itemFilter;
        });

      return TBody(itemFilter);
    }

    return TBody(statewar);
  };
  const mapFilter = () => {
    const { filterByName: { name } } = filterwars;
    if (name) {
      const statewarsfilter = statewars.filter((i) => i.name.includes(name));
      return columnFilter(statewarsfilter);
    }
    return columnFilter();
  };

  return (
    <table>
      {THead()}
      {mapFilter()}
    </table>
  );
}

export default PlanetTable;

import currencyFormatter from '../helpers/currency-formatter.js';

const render = (data) => {
  const table = document.querySelector('tbody');
  table.innerHTML = '';

  data.map((item) => table.append(createTableRow(item)));
};

const createTableRow = (item) => {
  const tr = document.createElement('tr');
  tr.innerHTML = `
          <td>${item.month}</td>
          <td>${currencyFormatter.format(item.sales)}</td>
          <td>${item.salesperson}</td>
      `;

  return tr;
};

export default render;

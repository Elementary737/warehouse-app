import { Link } from "react-router-dom";

function InventoryTable({ items, onDelete }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Назва</th>
          <th>Опис</th>
          <th>Дії</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <img
                className="img"
                src={`http://localhost:3000/inventory/${item.id}/photo`}
              />
            </td>

            <td>{item.inventory_name}</td>

            <td>{item.description}</td>

            <td>
              <div style={{ display: "flex", gap: "8px" }}>
                <Link className="btn btn-blue" to={`/inventory/${item.id}`}>
                  Перегляд
                </Link>

                <Link className="btn btn-yellow" to={`/edit/${item.id}`}>
                  Редагувати
                </Link>

                <button
                  className="btn btn-red"
                  onClick={() => onDelete(item.id)}
                >
                  Видалити
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
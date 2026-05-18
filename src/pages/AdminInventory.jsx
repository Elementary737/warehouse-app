import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InventoryTable from "../components/inventory/InventoryTable";
import { getInventory, deleteInventory } from "../services/inventoryApi";

function AdminInventory() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInventory();
    setItems(res.data);
  };

  const handleDelete = async (id) => {
    await deleteInventory(id);
    load();
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Адмін-панель складу</h1>

        <Link to="/create" className="btn-create">
          ➕ Створити
        </Link>
      </div>

      <InventoryTable items={items} onDelete={handleDelete} />
    </div>
  );
}

export default AdminInventory;
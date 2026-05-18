import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInventoryById } from "../services/inventoryApi";
import InventoryDetails from "../components/inventory/InventoryDetails";

function AdminInventoryDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getInventoryById(id);
    setItem(res.data);
  };

  return (
    <div className="page">
      <h1>Перегляд інвентарю</h1>

      <InventoryDetails item={item} />
    </div>
  );
}

export default AdminInventoryDetails;
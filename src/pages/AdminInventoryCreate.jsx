import { useNavigate } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import { createInventory } from "../services/inventoryApi";

function AdminInventoryCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await createInventory(formData);
    navigate("/");
  };

  return (
    <div className="page">
      <h1>Створення інвентарю</h1>

      <InventoryForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AdminInventoryCreate;
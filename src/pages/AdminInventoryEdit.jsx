import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InventoryForm from "../components/inventory/InventoryForm";
import {
  getInventoryById,
  updateInventory,
  updateInventoryPhoto,
} from "../services/inventoryApi";

function AdminInventoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getInventoryById(id);
      setItem(res.data);
    } catch (err) {
      console.log("LOAD ERROR:", err);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      console.log("UPDATE CLICKED");

      const name = formData.get("inventory_name");
      const desc = formData.get("description");
      const photo = formData.get("photo");

      // 1. оновлюємо текст
      await updateInventory(id, {
        inventory_name: name,
        description: desc,
      });

      // 2. якщо є фото — окремий запит
      if (photo) {
        const photoData = new FormData();
        photoData.append("photo", photo);

        await updateInventoryPhoto(id, photoData);
      }

      console.log("UPDATE SUCCESS");

      navigate("/");
    } catch (err) {
      console.log("UPDATE ERROR:", err);
    }
  };

  return (
    <div className="page">
      <h1>Редагування інвентарю</h1>

      {item && (
        <InventoryForm
          initialData={item}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default AdminInventoryEdit;
import { useState, useEffect } from "react";

function InventoryForm({ initialData, onSubmit }) {
  const [inventory_name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const isEdit = !!initialData?.id;

  // 💥 ТІЛЬКИ ДЛЯ EDIT
  useEffect(() => {
    if (isEdit) {
      setName(initialData.inventory_name || "");
      setDescription(initialData.description || "");
    }
  }, [isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("inventory_name", inventory_name);
    formData.append("description", description);

    if (photo) {
      formData.append("photo", photo);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Назва"
        value={inventory_name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Опис"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      <button type="submit">
        {isEdit ? "Оновити" : "Створити"}
      </button>
    </form>
  );
}

export default InventoryForm;
function InventoryDetails({ item }) {
  if (!item) return <p>Завантаження...</p>;

  return (
    <div>
      <h2>{item.inventory_name}</h2>

      <p style={{ color: "#666" }}>{item.description}</p>

      <img
        src={`http://localhost:3000/inventory/${item.id}/photo`}
        alt=""
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "10px",
          marginTop: "15px",
        }}
      />
    </div>
  );
}

export default InventoryDetails;
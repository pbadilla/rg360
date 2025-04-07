function procesarProducto(row) {
  const csvreference = `US-${row["Reference"]}`;
  const csvstock = row["Stock"];
  console.log(`Processing product ${csvreference} with stock: ${csvstock}`);
  // Add logic for DB or file update if needed
}

module.exports = { procesarProducto };

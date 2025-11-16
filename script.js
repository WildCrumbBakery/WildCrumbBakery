document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  setupOrderSummary();
});

function setupOrderSummary() {
  const qtyInputs = document.querySelectorAll("[data-item-name]");
  const summaryField = document.getElementById("orderSummary");
  const form = document.getElementById("orderForm");

  if (!qtyInputs.length || !summaryField || !form) return;

  function updateSummary() {
    const lines = [];
    qtyInputs.forEach(input => {
      const qty = parseInt(input.value, 10) || 0;
      const name = input.getAttribute("data-item-name") || "Item";
      if (qty > 0) {
        lines.push(`${qty} × ${name}`);
      }
    });

    summaryField.value = lines.length
      ? lines.join("\n")
      : "No items selected yet. Set quantities above to build your order.";
  }

  qtyInputs.forEach(input => {
    input.addEventListener("input", updateSummary);
  });

  updateSummary();

  form.addEventListener("submit", (event) => {
    const hasItems = Array.from(qtyInputs).some(input => {
      const qty = parseInt(input.value, 10) || 0;
      return qty > 0;
    });

    if (!hasItems) {
      event.preventDefault();
      alert("Please select at least one item (set a quantity greater than zero).");
    }
  });
}

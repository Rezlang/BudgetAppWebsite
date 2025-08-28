export const fmtMoney = (n) => (n < 0 ? "-$" : "$") + Math.abs(n).toFixed(2);

export function aiCategorize(row) {
  const s = (row.description || "").toLowerCase();
  if (/uber|lyft|metro|bus/.test(s)) return "Transport";
  if (/whole\s?foods|trader\s?joe|aldi|kroger/.test(s)) return "Groceries";
  if (/mcdonald|starbucks|chipotle|pizza|cafe/.test(s)) return "Dining";
  if (/netflix|spotify|hulu|disney/.test(s)) return "Entertainment";
  if (/amazon|target|nike|adidas/.test(s)) return "Shopping";
  if (/rent|landlord/.test(s)) return "Rent";
  return "Other";
}

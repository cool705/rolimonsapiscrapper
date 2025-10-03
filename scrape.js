export default async function handler(req, res) {
  // Example: return some fake data
  const data = { item: "Rolimon's example item", value: 12345 };
  res.status(200).json(data);
}

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.rolimons.com/items/v2/itemdetails');
    const data = await response.json();

    const simplified = Object.entries(data.items).map(([id, values]) => ({
      id,
      value: values[3] // 4th entry: "value"
    }));

    res.status(200).json({ items: simplified });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Rolimons API' });
  }
}

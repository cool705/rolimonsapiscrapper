export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.rolimons.com/items/v2/itemdetails');
    const data = await response.json();

    const minValue = parseInt(req.query.minValue) || 0;

    const items = Object.entries(data.items)
      .map(([id, values]) => ({ i: id, v: values[3] }))
      .filter(item => item.v !== -1 && item.v >= minValue);

    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    res.status(200).json({items});
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
}

let cachedData = null;
let lastFetched = 0;
const CACHE_DURATION = 10800000; // 3 hr

export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.rolimons.com/items/v2/itemdetails');
    if (!response.ok) throw new Error("Failed to fetch Rolimon API");

    const data = await response.json();

    const minValue = parseInt(req.query.minValue) || 0;

    const items = {};
    for (const [id, values] of Object.entries(data.items)) {
      const v = values[3];
      if (v !== -1 && v >= minValue) {
        items[id] = v;
      }
    }

    cachedData = { items };
    lastFetched = now;

    res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate');
    res.status(200).json({ items });
  } catch (error) {
      if (cachedData) {
        return res.status(200).json(cachedData);
      }

   res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
}

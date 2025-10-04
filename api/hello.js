let cachedData = null;
let lastFetched = 0;
const CACHE_DURATION = 86400; 

export default async function handler(req, res) {
  const now = Date.now();

  if (cachedData && (now - lastFetched < CACHE_DURATION)) {
    return res.status(200).json(cachedData);
  }

  try {
    const response = await fetch('https://api.rolimons.com/items/v2/itemdetails');
    if (!response.ok) throw new Error("Failed to fetch Rolimon API");

    const data = await response.json();
    const minValue = parseInt(req.query.minValue) || 0;

    const items = {};
    const ItemsDataTable = data.items;

    for (const id in ItemsDataTable) {
      const v = ItemsDataTable[id][3];
      if (v >= minValue && v !== -1) {
        items[id] = v;
      }
    }

    cachedData = { items };
    lastFetched = now;

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.status(200).json(cachedData);
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
}

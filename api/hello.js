
export default async function handler(req, res) {
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


    res.setHeader('Cache-Control', 's-maxage=10800, stale-while-revalidate');
    res.status(200).json({ items });
  } catch (error) {

    res.status(500).json({ success: false, error: 'Failed to fetch data' });
  }
}

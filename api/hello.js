export default function handler(req, res) {
    const response = await fetch('https://api.rolimons.com/items/v2/itemdetails');
    const data = await response.json();
  const result = Object.entries(data.items).map(([id, values]) => ({
  id,
  value: values[3] 
}));

console.log(result);
  
  res.status(200).json({ message: result });
}

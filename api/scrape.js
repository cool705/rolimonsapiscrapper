export default function handler(req, res) {
  const data = {
    status: "ok",
    source: "rolimons",
    items: [
      { name: "Cool Hat", value: 5000 },
      { name: "Epic Sword", value: 12000 }
    ]
  };

  res.status(200).json(data);
}

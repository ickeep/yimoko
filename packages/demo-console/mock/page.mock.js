module.exports = {
  'GET /api/page/list': (req, res) => {
    const { name = '', id } = req.query;
    const i = parseInt(Math.random() * 100);
    if (name === "err") {
      return res.json({ code: 500, msg: "error" });
    }
    const data = {
      "data": [
        {
          "id": "4" + i,
          "name": "微信",
        },
        {
          "id": "2" + i,
          "name": "QQ",
        },
        {
          "id": "1" + i,
          "name": "钉钉",
        }
      ],
      "page": 1,
      "pageSize": 100,
      "count": 3,
      "totalPages": 1,
      "currentPage": 1
    }
    return res.json(data);
  }
}
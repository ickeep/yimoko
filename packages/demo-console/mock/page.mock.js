module.exports = {
  'GET /api/page/list': (req, res) => {
    const { name = '', id } = req.query;
    const data = {
      "data": [
        {
          "id": "4",
          "name": "微信",
        },
        {
          "id": "2",
          "name": "QQ",
        },
        {
          "id": "1",
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
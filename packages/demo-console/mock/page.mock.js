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
          obj: { id: 'o1', name: 'obj1' },
          "id": "4" + i,
          "name": "微信",
          tag: 't1,t2,t3',
          arr: ['1', '2', '3'],
          date: '2019-01-01',
          time: '12:00',
          percentage: '0.5%',
          zh: '啊啊啊',
          length: 'aaaaa'
        },
        {
          obj: { id: 'o2', name: 'obj2' },
          "id": "2" + i,
          "name": "QQ",
          tag: 't1,t22,t3',
          arr: ['1', '22', '3'],
          date: '2019-01-03',
          time: '14:00',
          percentage: '0.4%',
          zh: '哦哦哦',
          length: 'bbbb'
        },
        {
          obj: { id: 'o3', name: 'obj3' },
          "id": "1" + i,
          "name": "钉钉",
          tag: 't1,t2,t33',
          arr: ['1', '2', '33'],
          date: '2019-01-02',
          time: '13:00',
          percentage: '0.6%',
          zh: '额额额',
          length: 'cccccccccccc'
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
module.exports = {
  'GET /api/data/options': (req, res) => {
    const { name = '', id } = req.query;
    if (id) {
      return res.json([{ value: id, label: 'label-' + id }]);
    }
    if (!name) {
      return res.json([{ value: 'v1', label: 'l1' }, { value: 'v2', label: 'l2' }]);
    }
    return res.json([...name].map((item, i) => {
      return { value: 'v-' + name + '-' + item + '-' + i, label: 'l-' + name + '-' + item + '-' + i }
    }));
  }
}
module.exports = {
  'GET /api/data/options': (req, res) => {
    console.log(req.query);
    return res.json([{ value: '1', label: '1' }]);
  }
}
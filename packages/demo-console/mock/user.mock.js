const BASE_URL = '/api/userinfo';

module.exports = {
  [`GET ${BASE_URL}/:id`]: (req, res) => {
    console.log('---->', req.params)
    return res.json({
      id: 1,
      username: 'kenny',
      sex: 6
    });
  }
}

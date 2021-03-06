const jwt = require('jsonwebtoken');
const { client } = require('../../clients/commercetools/client');

module.exports = (req, res) => {
  const token = req.get('Authorization');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const customerId = decoded.userId;
  client.orders
    .where(`customerId="${customerId}"`)
    .fetch()
    .then(function(orders) {
      res.json(orders);
    });
};

const delay = require('mocker-api/lib/delay');
const user = require('./user.mock');
const dataMock = require('./data.mock');
const templateMock = require('./template.mock');

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
  ...user,
  ...dataMock,
  ...templateMock
}
module.exports = (noProxy ? {} : delay(proxy, 300));
// module.exports = proxy;
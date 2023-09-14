const mongoose = require('mongoose');
const Request = require('./models/request');

mongoose.set('strictQuery', false);
mongoose.connect("request url from jacob");

const request1 = new Request({
  method: 'GET',
  path: '/',
  headers: {host: 'enly5typv6anr.x.pipedream.net'},
  body: {"zen":"Speak like a human.","hook_id":432955597,"hook":{"type":"Repository","id":432955597,"name":"web","active":true,"events":["*"],"config":{"content_type":"json","insecure_ssl":"0","url":"https://enly5typv6anr.x.pipedream.net"},"updated_at":"2023-09-11T02:08:18Z","created_at":"2023-09-11T02:08:18Z","url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597","test_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/test","ping_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/pings","deliveries_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/deliveries","last_response":{"code":null,"status":"unused","message":null}},"repository":{"id":689745107,"node_id":"R_kgDOKRys0w","name":"test-webhooks"}}
})

const request2 = new Request({
  method: 'POST',
  path: '/path',
  headers: {host: 'enly5typv6anr.x.pipedream.net', 'x-amzn-trace-id': 'Root=1-64ff2a41-56c163b91e20c3d76e4abd4b', 'content-length': '6288', 'user-agent': 'GitHub-Hookshot/c088b1f', accept: '*/*', 'x-github-delivery':  '2c5e7520-50b3-11ee-9809-93438ba782d3', 'x-github-event': 'star', 'x-github-hook-id': '432955597', 'x-github-hook-installation-target-id': '689745107', 'x-github-hook-installation-target-type': 'repository', 'content-type': 'application/json'},
  body: {"zen":"Speak like a human.","hook_id":432955597,"hook":{"type":"Repository","id":432955597,"name":"web","active":true,"events":["*"],"config":{"content_type":"json","insecure_ssl":"0","url":"https://enly5typv6anr.x.pipedream.net"},"updated_at":"2023-09-11T02:08:18Z","created_at":"2023-09-11T02:08:18Z","url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597","test_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/test","ping_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/pings","deliveries_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/deliveries","last_response":{"code":null,"status":"unused","message":null}},"repository":{"id":689745107,"node_id":"R_kgDOKRys0w","name":"test-webhooks"}}
});

request1.save().then(result => {
  console.log(result);
});

request2.save().then(result => {
  console.log(result);
});

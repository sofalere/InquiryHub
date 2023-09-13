INSERT INTO bins (endpoint)
  VALUES ('/endpoint');


INSERT INTO requests (headers, body, bin_id)
  VALUES  ('{host: enly5typv6anr.x.pipedream.net}', '{"zen":"Speak like a human.","hook_id":432955597,"hook":{"type":"Repository","id":432955597,"name":"web","active":true,"events":["*"],"config":{"content_type":"json","insecure_ssl":"0","url":"https://enly5typv6anr.x.pipedream.net"},"updated_at":"2023-09-11T02:08:18Z","created_at":"2023-09-11T02:08:18Z","url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597","test_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/test","ping_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/pings","deliveries_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/deliveries","last_response":{"code":null,"status":"unused","message":null}},"repository":{"id":689745107,"node_id":"R_kgDOKRys0w","name":"test-webhooks",}', 1),
  ('{host: enly5typv6anr.x.pipedream.net, x-amzn-trace-id: Root=1-64ff2a41-56c163b91e20c3d76e4abd4b,content-length: 6288,user-agent: GitHub-Hookshot/c088b1f, accept: */*, x-github-delivery:  2c5e7520-50b3-11ee-9809-93438ba782d3, x-github-event: star, x-github-hook-id: 432955597, x-github-hook-installation-target-id: 689745107, x-github-hook-installation-target-type: repository, content-type: application/json}', '{"zen":"Speak like a human.","hook_id":432955597,"hook":{"type":"Repository","id":432955597,"name":"web","active":true,"events":["*"],"config":{"content_type":"json","insecure_ssl":"0","url":"https://enly5typv6anr.x.pipedream.net"},"updated_at":"2023-09-11T02:08:18Z","created_at":"2023-09-11T02:08:18Z","url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597","test_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/test","ping_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/pings","deliveries_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/deliveries","last_response":{"code":null,"status":"unused","message":null}},"repository":{"id":689745107,"node_id":"R_kgDOKRys0w","name":"test-webhooks",}', 1);



-- ('POST', '/endpoint', 't_aWMLpFYnKfbT3sUIzav9hPY43CEbbt', 1),
--           ('POST', '/endpoint', 'DZcH8gDl55Wil_FWIjXOJzgAAr8SXM', 1),
--           ('POST', '/endpoint', 'KJ3_dC9iaGGjaASpgwmELrPYHbuV5X3d', 1),
--           ('POST', '/endpoint', 'dkvp2NEtoBqrcV0PDBuB6m-lkcHm8hGX', 1),
--           ('POST', '/endpoint', 'Fi90s_DI2fTHHo78lWWKheNqoVCTvbWG', 1),
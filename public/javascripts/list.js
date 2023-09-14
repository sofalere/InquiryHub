const services = require('./services');

// let dummyRequests = [
//   {request_id: 0, route: '/1', method: 'GET', body: 'welcome to request bin', created_at: '11/12/12', headers: '{host: enly5typv6anr.x.pipedream.net}'},
//   {request_id: 1, route: '/hi', method: 'POST', body: 'this is a post request', created_at: '08/02/21', headers: 'x-amzn-trace-id: Root=1-64ff2a41-56c163b91e20c3d76e4abd4b,content-length: 6288'},
//   {request_id: 2, route: '/', method: 'PUT', body: 'three for good measure', created_at: '9/01/22', headers: 'accept: */*, x-github-delivery:  2c5e7520-50b3-11ee-9809-93438ba782d3'},
// ]

// let bins = [
//   {bin_id: 0, endpoint: '1'},
//   {bin_id: 1, endpoint: '/hi'},
//   {bin_id: 2, endpoint: '/hello'},
// ]
//hello
// let mongoRequest = 
// {method: 'POST',
// path: '/path',
// headers: {host: 'enly5typv6anr.x.pipedream.net', 'x-amzn-trace-id': 'Root=1-64ff2a41-56c163b91e20c3d76e4abd4b', 'content-length': '6288', 'user-agent': 'GitHub-Hookshot/c088b1f', accept: '*/*', 'x-github-delivery':  '2c5e7520-50b3-11ee-9809-93438ba782d3', 'x-github-event': 'star', 'x-github-hook-id': '432955597', 'x-github-hook-installation-target-id': '689745107', 'x-github-hook-installation-target-type': 'repository', 'content-type': 'application/json'},
// body: {"zen":"Speak like a human.","hook_id":432955597,"hook":{"type":"Repository","id":432955597,"name":"web","active":true,"events":["*"],"config":{"content_type":"json","insecure_ssl":"0","url":"https://enly5typv6anr.x.pipedream.net"},"updated_at":"2023-09-11T02:08:18Z","created_at":"2023-09-11T02:08:18Z","url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597","test_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/test","ping_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/pings","deliveries_url":"https://api.github.com/repos/marymcdonald/test-webhooks/hooks/432955597/deliveries","last_response":{"code":null,"status":"unused","message":null}},"repository":{"id":689745107,"node_id":"R_kgDOKRys0w","name":"test-webhooks"}}
// }

document.addEventListener('DOMContentLoaded', async () => {
  // elements = {
  //   home: document.querySelector('#home'),
  //   binPage: document.querySelector('#all-bins'),
  //   requestPage: document.querySelector('#single-bin'),
  //   requests: document.querySelector('#requests'),
  //   bins: document.querySelector('#bins'),
  //   requestDetailModal: document.querySelector('#request_detail_modal'),
  //   modalLayer: document.querySelector('#modal_layer'),
  // }

  let requestPage = document.querySelector('#single-bin');
  let requestList = document.querySelector('#requests');
  let requestDetailModal = document.querySelector('#request-detail-modal');
  let modalLayer = document.querySelector('#modal-layer');
  let binPage = document.querySelector('#all-bins');
  let binList = document.querySelector('#bins');
  let home = document.querySelector('#home');
  let addNewButton = document.querySelector('#add-new-button');

  let bins = await services.getBins();
  console.log(bins);
  renderBins(bins, binList, binPage); 

  requestList.addEventListener('click', async (e) => {
    let id = e.target.dataset.request_id;
    let request = await services.getRequest(id)
    requestDetailModal.textContent = `Headers: ${JSON.stringify(request.headers)} Body: ${JSON.stringify(request.body)}`;

    showModal(modalLayer, requestDetailModal);
  });
  
  modalLayer.addEventListener('click', (e) => {
    requestDetailModal.textContent = "";
    hideModal(modalLayer, requestDetailModal);
  });

  binList.addEventListener('click', async (e) => {
      let binId = e.target.dataset.bin_id;
      let requests = await services.getRequests(binId);
      console.log(requests);

      renderRequests(requests, requestList, requestPage);
  });

  home.addEventListener('click', (e) => {
    showPage(binPage);
  })

  addNewButton.addEventListener('click', async (e) => {
    const rawBin = await services.createBin();
    const newBin = createBin(rawBin);
    bins.push(newBin);
    renderBins(bins, binList, binPage);
  })
});

function showPage(pageElem) {
  let main = document.querySelector('#main');
  main.childNodes.forEach((child) => {
    child.hidden = true;
  });
  pageElem.hidden = false;
}

function renderRequests(requests, list, requestPage) {
  showPage(requestPage);
  list.innerHTML = "";
  requests.forEach((request) => {
    let listItem = createRequestItem(request);
    list.appendChild(listItem);
  });
}

function createRequestItem(request) {
  let item = document.createElement('li');
  let text = 'Method: ' + request.method + '. Route: ' + request.path + ' created at: ' + request.created_at;
  item.textContent = text;
  item.dataset.request_id = request.id;
  return item;
}

function renderBins(bins, list, binPage) {
  showPage(binPage);
  list.innerHTML = "";
  bins.forEach((bin) => {
    let listItem = createBin(bin);
    list.appendChild(listItem);
  });
}

function createBin(bin) {
  let item = document.createElement('li');
  let text = 'Endpoint: ' + bin.endpoint;
  item.textContent = text;
  item.dataset.bin_id = bin.bin_id;
  return item;
}

function showModal(modalLayer, requestDetailModal) {
  modalLayer.style.display = 'block';
  requestDetailModal.style.display = 'block';
}

function hideModal(modalLayer, requestDetailModal) {
  modalLayer.style.display = 'none';
  requestDetailModal.style.display = 'none';
}

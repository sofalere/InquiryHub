let dummyRequests = [
  {request_id: 0, route: '/', method: 'GET', body: 'welcome to request bin', created_at: '11/12/12'},
  {request_id: 1, route: '/hi', method: 'POST', body: 'this is a post request', created_at: '08/02/21'},
  {request_id: 2, route: '/', method: 'PUT', body: 'three for good measure', created_at: '9/01/22'},
]

let dummyBins = [
  {bin_id: 0, endpoint: '/'},
  {bin_id: 1, endpoint: '/hi'},
  {bin_id: 2, endpoint: '/hello'},
]

let dummyRequest = {request_id: 2, route: '/', method: 'PUT', body: 'three for good measure', created_at: '9/01/22'}

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
  let requestDetailModal = document.querySelector('#request_detail_modal');
  let modalLayer = document.querySelector('#modal_layer');
  let binPage = document.querySelector('#all-bins');
  let binList = document.querySelector('#bins');
  let home = document.querySelector('#home');

  let bins = await getBins();
  renderBins(dummyBins, binList, binPage); 

  requestList.addEventListener('click', async (e) => {
    let id = e.target.dataset.request_id;
    let request = await getRequest(id)
    requestDetailModal.textContent = body;
    showModal(modalLayer, requestDetailModal);
  });
  
  modalLayer.addEventListener('click', (e) => {
    requestDetailModal.textContent = "";
    hideModal(modalLayer, requestDetailModal);
  });

  binList.addEventListener('click', async (e) => {
      let binId = e.target.dataset.bin_id;
      let requests = await getRequests(binId);

      renderRequests(requests, requestList, requestPage);
  });

  home.addEventListener('click', (e) => {
    showPage(binPage);
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
  let text = 'Method: ' + request.method + '. Route: ' + request.route + ' created at: ' + request.created_at;
  item.textContent = text;
  item.dataset.request_id = request.request_id;
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

// API Requests

async function getRequest(requestId) {
  try {
    let response = await fetch(`/api/bins/${binId}/requests/${requestId}`);
    let request = await response.json();
    return request;
  } catch (error) {
    alert(`Error loading all request: ${error}`);
  };
}

async function getRequests(binId) {
  try {
    let response = await fetch(`/api/bins/${binId}/requests`);
    let requests = await response.json();
    return requests;
  } catch (error) {
    alert(`Error loading all requests: ${error}`);
  };
}
  
async function getBins() {
  try {
    let response = await fetch(`/api/bins`);
    let bins = await response.json();
    return bins;
  } catch (error) {
    alert(`Error loading bins`);
  };
}

async function deleteRequest(binId, requestId) {
    try {
      let response = await fetch(`/api/bins/${binId}/requests/${requestId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      alert(`Error deleting request with id ${binId}: ${error}`);
    };
  }

async function deleteBin(binId) {
  try {
    await fetch(`/api/bins/${binId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    alert(`Error updating bin with id ${binId}`);
  };
}

// async function deleteAllRequests(binId) {
//   try {
//     let response = await fetch(`/api/bins/${binId}/requests/`, {
//       method: 'DELETE',
//     });
//   } catch (error) {
//     alert(`Error deleting all requests: ${error}`);
//   };
// }
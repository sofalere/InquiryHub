let dummyRequests = [
  {id: 0, route: '/', method: 'GET', body: 'welcome to request bin'},
  {id: 1, route: '/hi', method: 'POST', body: 'this is a post request'},
  {id: 2, route: '/', method: 'PUT', body: 'three for good measure'},
]

document.addEventListener('DOMContentLoaded', () => {
  let requestList = document.querySelector('#requests');
  let requestDetailModal = document.querySelector('#request_detail_modal');
  let modalLayer = document.querySelector('#modal_layer');
  renderRequests(dummyRequests, requestList);
  
  requestList.addEventListener('click', (e) => {
    let id = e.target.dataset.id;
    let body = dummyRequests.find(request => String(request.id) === id).body;
    requestDetailModal.textContent = body;
    showModal(modalLayer, requestDetailModal);
  });
  
  modalLayer.addEventListener('click', (e) => {
    requestDetailModal.textContent = "";
    hideModal(modalLayer, requestDetailModal);
  });
});

function renderRequests(requests, list) {
  list.innerHTML = "";
  requests.forEach((request) => {
    let listItem = createRequestItem(request);
    list.appendChild(listItem);
  });
}

// return list element
function createRequestItem(request) {
  let item = document.createElement('li');
  let text = 'Method: ' + request.method + '. Route: ' + request.route;
  item.textContent = text;
  item.dataset.id = request.id;
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

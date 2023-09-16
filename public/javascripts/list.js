import {
  getBins, getRequest, getRequests, addBin, deleteRequest, deleteBin,
} from './services.js';

document.addEventListener('DOMContentLoaded', async () => {
  const socket = io();
  const requestPage = document.querySelector('#single-bin');
  const requestList = document.querySelector('#requests');
  const requestDetailModal = document.querySelector('#request-detail-modal');
  const modalLayer = document.querySelector('#modal-layer');
  const binPage = document.querySelector('#all-bins');
  const binList = document.querySelector('#bins');
  const backButton = document.querySelector('#back');
  const addNewButton = document.querySelector('#add-new-button');
  const main = document.querySelector('#main');

  const bins = await getBins();
  renderBins(bins, binList, binPage);

  main.addEventListener('mouseenter', (event) => {
    if (event.target.classList.contains('hover-text')) {
      event.target.style.color = 'blue';
      event.target.style.cursor = 'help';
    }
  });

  main.addEventListener('mouseleave', (event) => {
    if (event.target.classList.contains('hover-text')) {
      event.target.style.color = 'black';
      event.target.style.cursor = 'pointer';
    }
  });

  requestList.addEventListener('click', async (e) => {
    if (e.target.tagName != 'LI') {
      return;
    }
    const requestItems = document.querySelectorAll('.hover-text');

    const id = e.target.dataset.request_id;
    const request = await getRequest(id);

    requestDetailModal.innerHTML = '';
    requestDetailModal.appendChild(renderSingleRequest(request));

    showModal(modalLayer, requestDetailModal);
  });

  modalLayer.addEventListener('click', (e) => {
    requestDetailModal.textContent = '';
    hideModal(modalLayer, requestDetailModal);
  });

  binList.addEventListener('click', async (e) => {
    const binId = e.target.dataset.bin_id;
    const requests = await getRequests(binId);
    renderRequests(requests, requestList, requestPage);
  });

  backButton.addEventListener('click', (e) => {
    requestDetailModal.innerHTML = '';
    showPage(binPage);
  });

  addNewButton.addEventListener('click', async (e) => {
    const bin = await addBin();
    bins.push(bin);
    renderBins(bins, binList, binPage);
  });

  socket.on('new request', (request) => {
    const listItem = createRequestItem(request);
    requestList.appendChild(listItem);
  });
});

function showPage(pageElem) {
  const main = document.querySelector('#main');
  main.childNodes.forEach((child) => {
    child.hidden = true;
  });
  pageElem.hidden = false;
}

function renderRequests(requests, list, requestPage) {
  showPage(requestPage);
  list.innerHTML = '';
  requests.forEach((request) => {
    const listItem = createRequestItem(request);

    list.appendChild(listItem);
  });
}

function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = '<span>&times;</span>';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const listItem = deleteButton.parentElement;
    if (listItem) {
      listItem.remove();
      listItem.dataset.request_id ? deleteRequest(listItem.dataset.request_id) : deleteBin(listItem.dataset.bin_id);
    }
  });
  return deleteButton;
}

function createRequestItem(request) {
  const item = document.createElement('li');
  item.classList.add('hover-text');
  const text = `Method: ${request.method}. Route: ${request.path} created at: ${request.created_at}`;
  item.textContent = text;
  item.dataset.request_id = request.id;

  item.appendChild(createDeleteButton());
  return item;
}

function renderBins(bins, list, binPage) {
  showPage(binPage);
  list.innerHTML = '';
  bins.forEach((bin) => {
    const listItem = createBin(bin);
    list.appendChild(listItem);
  });
}

function createBin(bin) {
  const item = document.createElement('li');
  item.classList.add('hover-text');
  const text = `Endpoint: ${bin.endpoint}`;
  item.textContent = text;
  item.dataset.bin_id = bin.id;
  item.appendChild(createDeleteButton());
  return item;
}

function displayJSONObject(container, obj, parentKey = '') {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const keyValueContainer = document.createElement('li');
      keyValueContainer.textContent = `${key}: ${JSON.stringify(obj[key])} \n`;
      container.appendChild(keyValueContainer);

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        displayJSONObject(obj[key], `${parentKey}${key}.`);
      }
    }
  }
}

function renderSingleRequest(request) {
  const modalContent = document.createElement('div');
  const headersHeader = document.createElement('h4');
  headersHeader.textContent = 'Headers:';
  modalContent.appendChild(headersHeader);
  displayJSONObject(modalContent, request.headers);
  const bodyHeader = document.createElement('h4');
  bodyHeader.textContent = 'Body:';
  modalContent.appendChild(bodyHeader);
  displayJSONObject(modalContent, request.body);

  return modalContent;
}

function showModal(modalLayer, requestDetailModal) {
  modalLayer.style.display = 'block';
  requestDetailModal.style.display = 'block';
}

function hideModal(modalLayer, requestDetailModal) {
  modalLayer.style.display = 'none';
  requestDetailModal.style.display = 'none';
}

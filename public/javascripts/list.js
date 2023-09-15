import {
  getBins, getRequest, getRequests, addBin, deleteRequest, deleteBin,
} from './services.js';

document.addEventListener('DOMContentLoaded', async () => {
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
    const requestItems = document.querySelectorAll('.hover-text');
    requestItems.forEach((item) => item.classList.remove('highlighted-request'));

    const id = e.target.dataset.request_id;
    const request = await getRequest(id);

    const modalContent = document.createElement('div');
    function displayJSONObject(obj, parentKey = '') {
      const container = modalContent;

      for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
              const keyValueContainer = document.createElement('div');
              keyValueContainer.textContent = `${key}: ${JSON.stringify(obj[key])} \n`;
              container.appendChild(keyValueContainer);

              if (typeof obj[key] === 'object' && obj[key] !== null) {
                  displayJSONObject(obj[key], `${parentKey}${key}.`);
              }
          }
      }
  }
    const headersHeader = document.createElement('h4');
    headersHeader.textContent = 'Headers:';
    modalContent.appendChild(headersHeader);
    displayJSONObject(request.headers);
    const bodyHeader = document.createElement('h4');
    bodyHeader.textContent = 'Body:';
    modalContent.appendChild(bodyHeader);
    displayJSONObject(request.body);

    requestDetailModal.innerHTML = '';
    requestDetailModal.appendChild(modalContent);
    e.target.classList.add('highlighted-request');

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

function createRequestItem(request) {
  const item = document.createElement('li');
  item.classList.add('hover-text');
  const text = `Method: ${request.method}. Route: ${request.path} created at: ${request.created_at}`;
  item.textContent = text;
  item.dataset.request_id = request.id;
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

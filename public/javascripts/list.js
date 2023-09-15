const services = require('./services');

document.addEventListener('DOMContentLoaded', async () => {
  let requestPage = document.querySelector('#single-bin');
  let requestList = document.querySelector('#requests');
  let requestDetailModal = document.querySelector('#request-detail-modal');
  let modalLayer = document.querySelector('#modal-layer');
  let binPage = document.querySelector('#all-bins');
  let binList = document.querySelector('#bins');
  let home = document.querySelector('#home');
  let addNewButton = document.querySelector('#add-new-button');
  let main = document.querySelector('#main');

  let bins = await services.getBins();
  renderBins(bins, binList, binPage); 

  main.addEventListener('mouseenter', function (event) {
    if (event.target.classList.contains('hover-text')) {
        event.target.style.color = 'blue';
        event.target.style.cursor = 'help';
      }
  });

  main.addEventListener('mouseleave', function (event) {
      if (event.target.classList.contains('hover-text')) {
          event.target.style.color = 'black';
          event.target.style.cursor = 'pointer';
      }
  });

  requestList.addEventListener('click', async (e) => {
    const requestItems = document.querySelectorAll('.hover-text');
    requestItems.forEach(item => item.classList.remove('highlighted-request'));

    const id = e.target.dataset.request_id;
    const request = await services.getRequest(id)

    const modalContent = document.createElement('div');
    
    const headersHeader = document.createElement('h2');
    headersHeader.textContent = 'Headers:';
    modalContent.appendChild(headersHeader);


    const headersParagraph = document.createElement('p');

    headersParagraph.textContent = JSON.stringify(request.headers);
    modalContent.appendChild(headersParagraph);


    const bodyHeader = document.createElement('h2');
    bodyHeader.textContent = 'Body:';
    modalContent.appendChild(bodyHeader);


    const bodyParagraph = document.createElement('p');

    bodyParagraph.textContent = JSON.stringify(request.body);
    modalContent.appendChild(bodyParagraph);

    requestDetailModal.innerHTML = '';
    requestDetailModal.appendChild(modalContent);
    e.target.classList.add('highlighted-request');

    showModal(modalLayer, requestDetailModal);
  });
  
  modalLayer.addEventListener('click', (e) => {
    requestDetailModal.textContent = "";
    hideModal(modalLayer, requestDetailModal);
  });

  binList.addEventListener('click', async (e) => {
      let binId = e.target.dataset.bin_id;
      let requests = await services.getRequests(binId);
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
  item.classList.add('hover-text');
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
  item.classList.add('hover-text');
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

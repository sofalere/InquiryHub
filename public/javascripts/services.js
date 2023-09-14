// API Requests

async function getRequest(requestId) {
  try {
    let response = await fetch(`/api/bins/1/requests/${requestId}`);
    let request = await response.json();
    return request;
  } catch (error) {
    alert(`Error loading all request: ${error}`);
  };
}

async function getRequests(binId) {
  try {
    let response = await fetch(`/api/bins/${binId}`);
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

async function createBin() {
  try {
    let response = await fetch(`/api/bins`, {
      method: 'POST'
    });
    let bin = await response.json();
    return bin;
  } catch (error) {
    alert(`Error adding bin: ${error}`);
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
//hello

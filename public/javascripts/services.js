export async function getRequest(requestId) {
  try {
    let response = await fetch(`/api/bins/1/requests/${requestId}`);
    let request = await response.json();
    return request;
  } catch (error) {
    alert(`Error loading all request: ${error}`);
  };
}

export async function getRequests(binId) {
  try {
    let response = await fetch(`/api/bins/${binId}`);
    let requests = await response.json();
    return requests;
  } catch (error) {
    alert(`Error loading all requests: ${error}`);
  };
}
  
export async function getBins() {
  try {
    const response = await fetch(`/api/bins`);
    const bins = await response.json();
    return bins;
  } catch (error) {
    alert(`Error loading bins`);
  };
}

export async function addBin() {
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

export async function deleteRequest(binId, requestId) {
    try {
      let response = await fetch(`/api/bins/${binId}/requests/${requestId}`, {
        method: 'DELETE',
      });
    } catch (error) {
      alert(`Error deleting request with id ${binId}: ${error}`);
    };
  }

export async function deleteBin(binId) {
  try {
    await fetch(`/api/bins/${binId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    alert(`Error updating bin with id ${binId}`);
  };
}

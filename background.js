chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'exportData') {
    chrome.storage.local.get('scrapedData', (result) => {
      if (result.scrapedData && result.scrapedData.length > 0) {
        exportToGoogleSheets(result.scrapedData);
      } else {
        sendMessageToPopup('No data to export.');
      }
    });
  }
});

function exportToGoogleSheets(data) {
  chrome.identity.getAuthToken({ interactive: true }, (token) => {
    console.log('OAuth2 Token:', token);
    if (token) {
      appendToGoogleSheet(data, token).then(response => {
        if (response.updates) {
          sendMessageToPopup('Data exported successfully.');
        } else {
          sendMessageToPopup('Failed to export data.');
        }
      }).catch(error => {
        console.error('Error:', error);
        sendMessageToPopup('Error exporting data.');
      });
    } else {
      sendMessageToPopup('Failed to get authentication token.');
    }
  });
}

function sendMessageToPopup(message) {
  chrome.runtime.sendMessage({ action: 'displayMessage', message: message });
}

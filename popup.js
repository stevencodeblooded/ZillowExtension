document.getElementById('scrape').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: scrapeData
    });
  });
  // Display scraping message
  document.getElementById('status').innerText = 'Scraping data...';
});

document.getElementById('export').addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'exportData' });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'displayMessage') {
    // Display message in popup
    document.getElementById('status').innerText = request.message;
  }
});

function scrapeData() {
  const data = {
    listPrice: document.querySelector('[data-testid="price"] span').innerText,
    address: document.querySelector('.styles__AddressWrapper-fshdp-8-100-2__sc-13x5vko-0.jrtioM h1').innerText,
    listingAgentName: document.querySelector('.Text-c11n-8-100-2__sc-aiai24-0.bSfDch').innerText,
    phoneNumber: document.querySelector('.Text-c11n-8-100-2__sc-aiai24-0.bSfDch').innerText,
    timeOnZillow: document.querySelector('.styles__StyledOverviewStats-fshdp-8-100-2__sc-1x11gd9-0.dMQsJk dt strong').innerText,
    mlsNo: document.querySelector('.Text-c11n-8-100-2__sc-aiai24-0.ecoOFY').innerText
  };

  chrome.storage.local.get({ scrapedData: [] }, (result) => {
    const existingData = Array.isArray(result.scrapedData) ? result.scrapedData : [];
    const updatedData = [...existingData, data];
    console.log(updatedData);

    chrome.storage.local.set({ scrapedData: updatedData }, () => {
      // Display scraping complete message
      chrome.runtime.sendMessage({ action: 'displayMessage', message: 'Data scraped and saved locally.' });
    });
  });
  
}

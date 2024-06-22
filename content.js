function scrapeZillowData() {
  const data = {
    listPrice: document.querySelector('[data-testid="price"] span').innerText,
    address: document.querySelector('.styles__AddressWrapper-fshdp-8-100-2__sc-13x5vko-0.jrtioM h1').innerText,
    listingAgentName: document.querySelector('.Text-c11n-8-100-2__sc-aiai24-0.bSfDch').innerText,
    phoneNumber: document.querySelector('.Text-c11n-8-100-2__sc-aiai24-0.bSfDch').innerText,
    timeOnZillow: document.querySelector('.styles__StyledOverviewStats-fshdp-8-100-2__sc-1x11gd9-0.dMQsJk dt strong').innerText,
    mlsNo: document.querySelector('.Text-c11n-8-100-2__sc-aiai24-0.ecoOFY').innerText
  };

  chrome.storage.local.get({ scrapedData: [] }, (result) => {
    const updatedData = [...result.scrapedData, data];
    chrome.storage.local.set({ scrapedData: updatedData }, () => {
      console.log('Data saved');
    });
  });
}

// Listen for the scrape command from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeData') {
    scrapeZillowData();
    sendResponse({ status: 'success' });
  }
});
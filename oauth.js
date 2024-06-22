function authenticate() {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: true }, (token) => {
        if (token) {
          resolve(token);
        } else {
          reject('Failed to get authentication token.');
        }
      });
    });
  }
  
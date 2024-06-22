function appendToGoogleSheet(data, token) {
  return fetch('https://sheets.googleapis.com/v4/spreadsheets/1-BFLjMbnbGxvCE8U_rFOfiiNJoxeHbtU8RqzteDSVEs/values/Testing:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS&includeValuesInResponse=true&responseDateTimeRenderOption=FORMATTED_STRING&responseValueRenderOption=FORMATTED_VALUE', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      range: "Testing",
      majorDimension: "ROWS",
      values: data.map(item => {
        const [streetAddress, cityZip] = item.address.split(', ');
        const [city, zipCode] = cityZip.split(' ');
        return [
          streetAddress,
          city,
          zipCode,
          item.mlsNo,
          item.listPrice,
          item.listingAgentName,
          item.phoneNumber,
          item.dom
        ];
      })
    })
  }).then(response => response.json());
}

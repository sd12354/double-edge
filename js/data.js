const https = require('https');
const fs = require('fs');
const { DateTime } = require('luxon');

// Define token headers
const token = "NjU4ZDRkNzgtMTViYy00ZTY0LTkyOTAtMmQyOGUxNjNkNzk3OnNic2RPcGVtMnlxdHdvSG10UmZRbjEubjVoWnl5OWRkNUdzSTFUfmxrNWI5RVdiTTNES0huQmx6SkZoWEUzcjY=";
const tokenHeaders = {
    'Authorization': 'Basic ' + token,
    'Content-Type': 'application/x-www-form-urlencoded'
};

// Define data
const data = 'grant_type=client_credentials';

// Calculate token expiration time
const tokenExpires = DateTime.now().plus({ hours: 1 });
const tokenExpiresStr = tokenExpires.toFormat('EEE_HH_mm');

// Make POST request
const url = 'https://auth.pingone.com/4c2b23f9-52b1-4f8f-aa1f-1d477590770c/as/token';
const options = {
    method: 'POST',
    headers: tokenHeaders
};
const req = https.request(url, options, (res) => {
    let response = '';
    res.on('data', (chunk) => {
        response += chunk;
    });
    res.on('end', () => {
        // Write token to file
        const tokenFileName = `token_expires_on_${tokenExpiresStr}.txt`;
        fs.writeFile(tokenFileName, response, (err) => {
            if (err) throw err;
            console.log(`Token saved to ${tokenFileName}`);
        });
    });
});
req.write(data);
req.end();

const crypto = require('crypto');
const axios = require('axios');

const WORKSPACE_ID = process.env.WORKSPACE_ID;
const WORKSPACE_KEY = process.env.WORKSPACE_KEY;

function buildSignature(date, contentLength) {
    const stringToHash = `POST\n${contentLength}\napplication/json\nx-ms-date:${date}\n/api/logs`;
    const bytesToHash = Buffer.from(stringToHash, 'utf-8');
    const keyBytes = Buffer.from(WORKSPACE_KEY, 'base64');
    const hmac = crypto.createHmac('sha256', keyBytes);
    hmac.update(bytesToHash);
    return `SharedKey ${WORKSPACE_ID}:${hmac.digest('base64')}`;
}

async function sendToSentinel(logs, logType) {
    const body = JSON.stringify(logs);
    const date = new Date().toUTCString();
    const contentLength = Buffer.byteLength(body, 'utf-8');
    const signature = buildSignature(date, contentLength);

    const url = `https://${WORKSPACE_ID}.ods.opinsights.azure.com/api/logs?api-version=2016-04-01`;

    await axios.post(url, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': signature,
            'Log-Type': logType,
            'x-ms-date': date,
        }
    });
}

module.exports = { sendToSentinel };

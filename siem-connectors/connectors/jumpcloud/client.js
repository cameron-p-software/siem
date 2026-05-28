const axios = require('axios');

const JUMPCLOUD_API_KEY = process.env.JUMPCLOUD_API_KEY;
const INSIGHTS_URL = 'https://api.jumpcloud.com/insights/directory/v1/events';
const V2_URL = 'https://console.jumpcloud.com/api/v2';
const V1_URL = 'https://console.jumpcloud.com/api';

const headers = {
    'x-api-key': JUMPCLOUD_API_KEY,
    'Content-Type': 'application/json',
};

// Pull events for one or more services from Directory Insights API (with pagination)
async function getDirectoryEvents(startTime, services) {
    const allEvents = [];

    for (const service of services) {
        let searchAfter = null;

        while (true) {
            const body = {
                service: [service],
                start_time: startTime,
                limit: 1000,
                sort: 'ASC',
            };
            if (searchAfter) body.search_after = searchAfter;

            try {
                const response = await axios.post(INSIGHTS_URL, body, {
                    headers,
                    validateStatus: null, // don't throw on 4xx
                });

                if (response.status !== 200) {
                    console.error(`Directory Insights API error for service "${service}":`, response.status, JSON.stringify(response.data));
                    break;
                }

                const events = response.data;
                if (!Array.isArray(events) || events.length === 0) break;

                allEvents.push(...events.map(e => ({ ...e, di_service: service })));

                // Check if there are more pages
                const resultCount = parseInt(response.headers['x-result-count'] || '0', 10);
                const limit = parseInt(response.headers['x-limit'] || '1000', 10);

                if (resultCount < limit) break; // no more pages

                const nextPage = response.headers['x-search_after'];
                if (!nextPage) break;

                try {
                    searchAfter = JSON.parse(nextPage);
                } catch {
                    break;
                }

            } catch (err) {
                console.error(`Directory Insights request failed for service "${service}":`, err.message);
                break;
            }
        }
    }

    return allEvents;
}

// Pull device and user inventory from v2 API
async function fetchAll(url) {
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (err) {
        if (err.response) {
            console.error(`JumpCloud API error for ${url}:`, err.response.status, JSON.stringify(err.response.data));
        }
        return [];
    }
}

async function getEvents(startTime) {
    const [directoryEvents, systemsRes, users, loggedInUsers] = await Promise.all([
        getDirectoryEvents(startTime, ['systems', 'software']),
        fetchAll(`${V1_URL}/systems`),
        fetchAll(`${V2_URL}/systeminsights/users`),
        fetchAll(`${V2_URL}/systeminsights/logged_in_users`),
    ]);

    const systems = Array.isArray(systemsRes) ? systemsRes : (systemsRes.results || []);

    return [
        ...directoryEvents.map(e => ({ ...e, log_type: 'directory_event' })),
        ...systems.map(e => ({ ...e, log_type: 'system' })),
        ...users.map(e => ({ ...e, log_type: 'user' })),
        ...loggedInUsers.map(e => ({ ...e, log_type: 'logged_in_user' })),
    ];
}

module.exports = { getEvents };

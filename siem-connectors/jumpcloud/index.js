const { sendToSentinel } = require('../core/sentinelClient');
const { getEvents } = require('../connectors/jumpcloud/client');

module.exports = async function (context, myTimer) {
    context.log('JumpCloud connector running...');

    try {
        const startTime = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const events = await getEvents(startTime);

        if (events && events.length > 0) {
            await sendToSentinel(events, 'JumpCloud_Events');
            context.log(`Sent ${events.length} events to Sentinel`);
        } else {
            context.log('No events to send');
        }
    } catch (err) {
        context.log.error('Error:', err.message);
        throw err;
    }
};

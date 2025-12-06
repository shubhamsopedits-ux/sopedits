/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.contact = onRequest(async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).send('Method Not Allowed');
		return;
	}
	try {
		const { name, email, message } = req.body || {};
		if (!name || !email || !message) {
			res.status(400).json({ error: 'Missing fields' });
			return;
		}
		logger.info('Contact received', { name, email });
		res.status(200).json({ ok: true });
	} catch (err) {
		logger.error('Contact error', err);
		res.status(500).json({ error: 'Server error' });
	}
});

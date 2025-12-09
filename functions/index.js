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
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");
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

// Secrets for SMTP setup (configure via `firebase functions:secrets:set ...`)
const SMTP_HOST = defineSecret('SMTP_HOST');
const SMTP_PORT = defineSecret('SMTP_PORT');
const SMTP_USER = defineSecret('SMTP_USER');
const SMTP_PASS = defineSecret('SMTP_PASS');
const TO_EMAIL = defineSecret('TO_EMAIL');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.contact = onRequest({ secrets: [SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, TO_EMAIL] }, async (req, res) => {
	if (req.method !== 'POST') {
		res.status(405).send('Method Not Allowed');
		return;
	}
	try {
		const { name, email, phone, state, city, message } = req.body || {};
		if (!name || !email) {
			res.status(400).json({ error: 'Missing required fields: name, email' });
			return;
		}

		// Create transporter once per request (container may reuse it)
		const transporter = nodemailer.createTransport({
			host: SMTP_HOST.value(),
			port: Number(SMTP_PORT.value() || 587),
			secure: Number(SMTP_PORT.value() || 587) === 465,
			auth: {
				user: SMTP_USER.value(),
				pass: SMTP_PASS.value(),
			},
		});

		const mailOptions = {
			from: `SOP Edits Contact <${SMTP_USER.value()}>`,
			to: TO_EMAIL.value() || SMTP_USER.value(),
			subject: `New enquiry from ${name}`,
			replyTo: email,
			text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nState: ${state || "-"}\nCity: ${city || "-"}\n\nMessage:\n${message || "-"}`,
			html: `<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Phone:</strong> ${phone || '-'}</p>
				<p><strong>Location:</strong> ${city || '-'}, ${state || '-'}</p>
				<p><strong>Message:</strong><br/>${(message || '-').replace(/\n/g, '<br/>')}</p>`,
		};

		await transporter.sendMail(mailOptions);
		logger.info('Contact email sent', { to: TO_EMAIL.value() || SMTP_USER.value() });
		res.status(200).json({ ok: true });
	} catch (err) {
		logger.error('Contact error', err);
		res.status(500).json({ error: 'Server error' });
	}
});

import cron from 'node-cron';

async function cronFallbackLead() {
	try {
		const res = await fetch('/api/zoho/fall-back', {
			method: 'POST',
		});
		const data = await res.json();
		console.log('Cron job response:', data);
	} catch (e) {
		console.error('An error occurred in cronFallbackLead function:', e);
	}
}
cron.schedule('0 * * * *', async () => {
	console.log('Running cron job every hour to process fallback leads');
	await cronFallbackLead();
});

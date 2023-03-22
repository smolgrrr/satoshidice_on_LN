const lnurl = require('lnurl');
require("dotenv").config();

const lnurlServer = lnurl.createServer({
	host: 'localhost',
	port: 3001,
    auth: {
		apiKeys: [],
	},
    lightning: {
		backend: 'lnd',
		config: {
			hostname: process.env.LND_RPC_URL,
			protocol: "https", // http if over tor, https otherwise
			//cert: {data: process.env.LND_TLS_VALUE},
            macaroon: {data: process.env.LND_MACAROON_VALUE}
		}
	},
	store: {
		backend: 'memory',
	},
});
module.exports = lnurlServer;
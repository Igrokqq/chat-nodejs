const env: NodeJSProcessEnv = process.env;

const config = {
	envMode: {
		isStaging: env.NODE_ENV === "staging",
		isDevelopment: env.NODE_ENV === 'development',
		isProduction: env.NODE_ENV === "production"
	},
	api: {
		baseUrl: env.REACT_APP_API_BASE_URL,
		socketIo: {
			baseUrl: env.REACT_APP_SOCKETIO_BASE_URL
		}
	}
};

export default config;
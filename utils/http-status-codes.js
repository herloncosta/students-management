export const HttpStatusCode = Object.freeze({
	// 2xx Success
	OK: { code: 200, message: "OK" },
	CREATED: { code: 201, message: "Created" },
	NO_CONTENT: { code: 204, message: "No Content" },

	// 3xx Redirection
	MOVED_PERMANENTLY: { code: 301, message: "Moved Permanently" },
	FOUND: { code: 302, message: "Found" },

	// 4xx Client Errors
	BAD_REQUEST: { code: 400, message: "Bad Request" },
	UNAUTHORIZED: { code: 401, message: "Unauthorized" },
	FORBIDDEN: { code: 403, message: "Forbidden" },
	NOT_FOUND: { code: 404, message: "Not Found" },
	CONFLICT: { code: 409, message: "Conflict" },
	UNPROCESSABLE_ENTITY: { code: 422, message: "Unprocessable Entity" },

	// 5xx Server Errors
	INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
	NOT_IMPLEMENTED: { code: 501, message: "Not Implemented" },
	BAD_GATEWAY: { code: 502, message: "Bad Gateway" },
	SERVICE_UNAVAILABLE: { code: 503, message: "Service Unavailable" },
});

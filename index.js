class BaseError extends Error {
 name;
 httpCode;
 isOperational;

 constructor(name, httpCode, description, isOperational) {
	 super(description);
	 Object.setPrototypeOf(this, new.target.prototype);

	 this.name = name;
	 this.httpCode = httpCode;
	 this.isOperational = isOperational;

	 Error.captureStackTrace(this);
 }
}

//free to extend the BaseError
class APIError extends BaseError {
 constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
	 super(name, httpCode, isOperational, description);
 }
}
export const HttpStatusCode ={
 OK : 200,
 BAD_REQUEST : 400,
 NOT_FOUND : 404,
 INTERNAL_SERVER : 500
}

const user = await User.getUserById(1);
if (user === null)
 throw new APIError(
	 'NOT FOUND',
	 HttpStatusCode.NOT_FOUND,
	 true,
	 'detailed explanation'
 );
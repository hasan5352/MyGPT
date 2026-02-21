import sendJson from "./response.js";

export default function errorHandler(err, req, res, next) {    // error handler
  console.log('failed this: ', err);
  sendJson(res, err.message || 'Internal Server Error', {}, false, err.statusCode || 500)
}

export default function sendJson(res, message, body, ok, statusCode) {
  res.status(statusCode || 200).json({ message, body });
}
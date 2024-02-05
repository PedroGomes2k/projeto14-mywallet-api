import httpStatus from "http-status";

export default function errorHandlingMiddleware(error, _req, res, next) {
  if (error === "unauthorized" || "tokenInstPass")
    return res.status(httpStatus.UNAUTHORIZED).send({ message: error.message });

  if (
    error === "passwordInvalid" ||
    "emailAlreadyExist" ||
    "verifyPasswordDifferent" ||
    "priceNevative"
  )
    return res.status(httpStatus.CONFLICT).send({ message: error.message });

  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}

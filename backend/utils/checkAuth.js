import jwt from 'jsonwebtoken';
import createError from './createError.js';
const secret="secret";

export default (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError({ status: 401, message: 'Unauthorized' }));
  }
  return jwt.verify(token,  secret, (err, decoded) => {
    if (err) {
      return next(createError({ status: 401, message: 'Unauthorized, invalid token' }));
    }
    req.user = decoded;
    return next();
  });
};

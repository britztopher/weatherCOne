import { STATUS_CODES } from 'http';

export class HttpError extends Error {
  constructor(status, message) {
    super(STATUS_CODES[status]);
    this.status = status;
    this.mesage = message;
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Resource not found') {
    super(message);
    this.status = 404;
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validation failed', details = []) {
    super(message);
    this.status = 400;
    this.details = details;
  }
}

export class DatabaseError extends Error {
  constructor(message = 'Database operation failed') {
    super(message);
    this.status = 500;
  }
}

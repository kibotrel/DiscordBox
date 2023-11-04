import * as Constants from '../constants/index.js'

export class GenericError extends Error {
  public readonly code: string
  public override readonly message: string
  constructor(
    message: string,
    code: Constants.ErrorCodes = Constants.ErrorCodes.Generic,
  ) {
    super()
    this.name = code
    this.code = code
    this.message = message
  }
}

export class BadRequestError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.BadRequest)
  }
}

export class ForbiddenError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.Forbidden)
  }
}

export class InternalError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.InternalError)
  }
}

export class LockedError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.Locked)
  }
}

export class NotFoundError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.NotFound)
  }
}

export class PayloadTooLargeError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.PayloadTooLarge)
  }
}

export class PreconditionFailedError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.PreconditionFailed)
  }
}

export class ServiceUnavailableError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.ServiceUnavailable)
  }
}

export class TimeoutError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.Timeout)
  }
}

export class TooManyRequestsError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.TooManyRequests)
  }
}

export class UnauthorizedError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.Unauthorized)
  }
}

export class UnavailableForLegalReasonsError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.UnavailableForLegalReasons)
  }
}

export class UnprocessableContentError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.UnprocessableContent)
  }
}

export class UpgradeRequiredError extends GenericError {
  constructor(message: string) {
    super(message, Constants.ErrorCodes.UpgradeRequired)
  }
}

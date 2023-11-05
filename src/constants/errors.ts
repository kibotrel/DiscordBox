export enum ErrorMessages {
  LinkAndUrlInButton = 'If you set the style to Link, you must provide a URL.',
  NoActionInButton = 'You must attach an action to this button.',
  InternalError = 'An internal error occured. Please contact the support.',
}

/**
 * Based on [HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).
 */
export enum ErrorCodes {
  /**
   * The request cannot be processed due to malformed user input.
   */
  BadRequest = 'BadRequest',
  /**
   * Even if the user is authenticated, they do not have permission to access this resource.
   */
  Forbidden = 'Forbidden',
  /**
   * The error is not one of the others.
   */
  Generic = 'Generic',
  /**
   * The server either does not recognize the error or wants to hide the specific information.
   */
  InternalError = 'InternalError',
  /**
   * The requested ressource is currently locked for some reason.
   */
  Locked = 'Locked',
  /**
   * The requested ressource does not exist.
   */
  NotFound = 'NotFound',
  /**
   * Data provided by the user is too large to be processed.
   */
  PayloadTooLarge = 'PayloadTooLarge',
  /**
   * Request processing stopped due to a precondition of some kind not being met.
   */
  PreconditionFailed = 'PreconditionFailed',
  /**
   * The server is currently unable to handle the request because it's down or under maintenance.
   */
  ServiceUnavailable = 'ServiceUnavailable',
  /**
   * Time to process the request has been exceeded.
   */
  Timeout = 'Timeout',
  /**
   * The user has sent too many requests in a given amount of time.
   */
  TooManyRequests = 'TooManyRequests',
  /**
   * User must be authenticated in some way to access this resource.
   */
  Unauthorized = 'Unauthorized',
  /**
   * The requested ressource cannot be legally provided to some or all users.
   */
  UnavailableForLegalReasons = 'UnavailableForLegalReasons',
  /**
   * The request was well-formed but server refuse to handle it for logical reasons.
   */
  UnprocessableContent = 'UnprocessableContent',
  /**
   * User must upgrade their subsciption to access feature.
   */
  UpgradeRequired = 'UpgradeRequired',
}

export interface ManagedCodeErrors {
  401?: Function;
};

export abstract class HttpError {
  public error: Response;
  public message: string;
  public action: string;
  constructor(error: Response, url: string, managedCodeError?: ManagedCodeErrors) {
    this.error = error;
    this.message = this.action + 'ERROR caught: ';
    this.message += '(status ' + (!isNaN(error.status) ? error.status : 'unkown') + ') ' + error.statusText;
    if (managedCodeError) {
      this.manageStatusError(managedCodeError);
    }
  }
  manageStatusError (managedCodeError: ManagedCodeErrors) {
    const statusCode = this.error.status;
    if (!isNaN(statusCode) && typeof managedCodeError[statusCode] === 'function') {
      managedCodeError[statusCode]();
    } else {
      console.error(`No action provided for ${statusCode} status code.`);
    }
  }
}
export class CreateHttpError extends HttpError {
  public action = 'CREATE';
}
export class ReadHttpError extends HttpError {
  public action = 'READ';
}


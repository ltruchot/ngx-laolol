export interface ManagedCodeErrors {
  400?: Function; // Bad request
  401?: Function; // Unauthorized
  500?: Function; // Internal Server Error
};

export abstract class HttpError {
  public error: Response;
  public code: number;
  public message: string;
  public action: string;
  public toasterMessage: string;
  constructor(error: Response, url: string, managedCodeError?: ManagedCodeErrors) {
    this.error = error;
    this.message = 'ERROR caught: ';
    this.message += '(status ' + (!isNaN(error.status) ? error.status : 'unkown') + ') ' + error.statusText;
    if (managedCodeError) {
      this.manageStatusError(managedCodeError);
    }
  }
  manageStatusError (managedCodeError: ManagedCodeErrors) {
    this.code = +this.error.status;
    if (!isNaN(this.code) && typeof managedCodeError[this.code] === 'function') {
      this.toasterMessage = managedCodeError[this.code]();
    } else {
      console.error(`No action provided for ${this.code} status code.`);
    }
  }
}
export class CreateHttpError extends HttpError {
  public action = 'CREATE';
}
export class ReadHttpError extends HttpError {
  public action = 'READ';
}
export class DeleteHttpError extends HttpError {
  public action = 'DELETE';
}


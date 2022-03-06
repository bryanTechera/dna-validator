interface IErrorPayload {
  code: string;
  message: string;
}

const ErrorNameToStatusCode = new Map<string, number>([
  ["matrixNotSquare", 400],
]);
export class HttpError {
  constructor(private error: Error) {}

  public getStatusCode(): number {
    const statusCode = ErrorNameToStatusCode.get(this.error.name);
    if (statusCode) {
      return statusCode;
    }
    return 500;
  }

  public getPayload(): IErrorPayload {
    return {
      code: this.error.name,
      message: this.error.message,
    };
  }
}

export default class VerifyError extends Error {
  status: number;
  constructor(statusError:number, messageError:string) {
    super(messageError);
    this.status = statusError;
  }
}

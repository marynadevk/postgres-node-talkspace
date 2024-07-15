export default class ServerError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ServerError';
    this.status = status;
  }
}
export class ServiceError<T extends string> extends Error {
  name: T;
  constructor(name: T, message: string) {
    super(message);
    this.name = name;
  }
}

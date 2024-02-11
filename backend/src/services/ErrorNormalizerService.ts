interface SingleError {
    message: string,
    field?: string,
}

export class ErrorNormalizerService {
    message: string;
    status?: number;
    errors?: SingleError[];

    constructor(message: string, errors?: SingleError[]) {
      this.message = message;
      this.errors = errors
    }

    buildErrors(){
      return {
        message: this.message,
        errors: this.errors || []
      }
    }

}
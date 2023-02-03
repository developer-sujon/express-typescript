declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

// declare type validate = {};

interface Error {
  status: number;
  message: string;
  stack?: string;
}

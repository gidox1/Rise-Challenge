export type Logger = {
  log: Function;
  error: Function;
  warn: Function;
};

export type UncaughtExceptionOrigin = 'uncaughtException' | 'unhandledRejection';

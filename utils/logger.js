const LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};

const MIN_LEVEL =
  typeof __DEV__ !== 'undefined' && __DEV__ ? LEVELS.debug : LEVELS.info;

const nativeConsole = {
  log: console.log.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console)
};

function timestamp() {
  return new Date().toISOString();
}

function formatArg(arg) {
  if (typeof arg === 'string') {
    return arg;
  }
  if (arg instanceof Error) {
    return arg.message;
  }
  if (arg && typeof arg === 'object') {
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}

export function normalizeError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }

  if (typeof error === 'string') {
    return { name: 'Error', message: error, stack: undefined };
  }

  if (error && typeof error === 'object') {
    return {
      name: error.name || 'Error',
      message: error.message || formatArg(error),
      stack: error.stack,
      code: error.code,
      status: error.status
    };
  }

  return { name: 'Error', message: String(error), stack: undefined };
}

function write(level, tag, message, details) {
  if (LEVELS[level] < MIN_LEVEL) {
    return;
  }

  const prefix = `[${timestamp()}] [${level.toUpperCase()}] [${tag}]`;
  const payload = details ? [prefix, message, details] : [prefix, message];

  switch (level) {
    case 'error':
      nativeConsole.error(...payload);
      break;
    case 'warn':
      nativeConsole.warn(...payload);
      break;
    default:
      nativeConsole.log(...payload);
  }
}

export function logDebug(tag, message, details) {
  write('debug', tag, message, details);
}

export function logInfo(tag, message, details) {
  write('info', tag, message, details);
}

export function logWarn(tag, message, details) {
  write('warn', tag, message, details);
}

export function logError(tag, message, error, details = {}) {
  write('error', tag, message, {
    ...details,
    error: normalizeError(error)
  });
}

export function installGlobalErrorHandlers() {
  if (global.__goldenHeartErrorHandlersInstalled) {
    return;
  }

  global.__goldenHeartErrorHandlersInstalled = true;

  const previousHandler = global.ErrorUtils?.getGlobalHandler?.();
  let isHandlingConsoleError = false;

  global.ErrorUtils?.setGlobalHandler?.((error, isFatal) => {
    logError('Global', isFatal ? 'Fatal uncaught error' : 'Uncaught error', error, {
      isFatal
    });
    previousHandler?.(error, isFatal);
  });

  if (typeof global.onunhandledrejection === 'undefined') {
    global.onunhandledrejection = (event) => {
      logError('Global', 'Unhandled promise rejection', event?.reason || event);
    };
  }

  console.error = (...args) => {
    if (isHandlingConsoleError) {
      nativeConsole.error(...args);
      return;
    }

    isHandlingConsoleError = true;
    try {
      const message = args.map(formatArg).join(' ');
      logError('Console', 'console.error', message, {
        args: args.slice(0, 5).map(formatArg)
      });
      nativeConsole.error(...args);
    } finally {
      isHandlingConsoleError = false;
    }
  };

  logInfo('Logger', 'Global error handlers installed');
}

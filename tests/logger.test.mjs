import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeError } from '../utils/logger.js';

test('normalizeError preserves Error fields', () => {
  const error = new Error('boom');
  error.name = 'TestError';

  assert.deepEqual(normalizeError(error), {
    name: 'TestError',
    message: 'boom',
    stack: error.stack
  });
});

test('normalizeError wraps string values', () => {
  assert.deepEqual(normalizeError('something broke'), {
    name: 'Error',
    message: 'something broke',
    stack: undefined
  });
});

test('normalizeError extracts object error fields', () => {
  assert.deepEqual(
    normalizeError({ name: 'AuthApiError', message: 'Invalid login', code: 401 }),
    {
      name: 'AuthApiError',
      message: 'Invalid login',
      stack: undefined,
      code: 401,
      status: undefined
    }
  );
});

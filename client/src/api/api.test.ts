import { describe, it, expect } from 'vitest';
import { validateResponse } from './api';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

describe('API :: validateResponse', () => {
  it('Не выбрасывает исключение при успешном ответе', () => {
    const response: AxiosResponse = {
      status: 200,
      data: {},
      statusText: 'OK',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
      request: {},
    };

    expect(() => validateResponse(response)).not.toThrow();
  });

  it('Выбрасывает исключение при ошибке валидации', () => {
    const response: AxiosResponse = {
      status: 400,
      data: {
        error: 'ValidationError',
        message: 'Invalid data',
      },
      statusText: 'Bad Request',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
      request: {},
    };

    expect(() => validateResponse(response)).toThrow('Invalid data');
  });

  it('Выбрасывает исключение при сетевой ошибке', () => {
    const response: AxiosResponse = {
      status: 500,
      data: {},
      statusText: 'Internal Server Error',
      headers: {},
      config: {} as InternalAxiosRequestConfig,
      request: {},
    };

    expect(() => validateResponse(response)).toThrow('500 Internal Server Error');
  });
});

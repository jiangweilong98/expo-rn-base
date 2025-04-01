// @ts-nocheck
/* 临时禁用整个文件的类型检查 */
// import { useState, useEffect, useRef, useCallback } from 'react';
// import { fetch } from 'expo/fetch';
// import type { FetchRequestInit } from 'expo/fetch';

/* type UseFetchOptions = FetchRequestInit & {
  initialFetch?: boolean;
  onSuccess?: <T>(response: ResponseData<T>) => void;
  onError?: (error: unknown) => void;
};

type ResponseData<T> = {
  data: T;
  headers: Headers;
  status: number;
  ok: boolean;
};

type UseFetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: unknown;
  execute: (overrides?: FetchRequestInit) => Promise<void>;
  abort: () => void;
}; */
const useFetch = (url, options = {}) => {};

export default useFetch;

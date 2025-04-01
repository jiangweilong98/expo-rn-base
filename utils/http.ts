import { fetch } from 'expo/fetch';
import type { FetchRequestInit } from 'expo/fetch';

interface HttpResponse<T = any> {
  data: T;
  status: number;
  headers: Headers;
  ok: boolean;
}

type RequestInterceptor = (
  options: FetchRequestInit,
) => Promise<FetchRequestInit> | FetchRequestInit;
type ResponseInterceptor<T = any> = (
  response: HttpResponse<T>,
) => Promise<HttpResponse<T>> | HttpResponse<T>;

class HttpClient {
  readonly baseURL: string;
  private interceptors: {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
  };
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.interceptors = {
      request: [],
      response: [],
    };
  }

  async request<T = any>(
    endpoint: string,
    options: FetchRequestInit = {},
  ): Promise<HttpResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    // 处理请求拦截器
    let mergedOptions: FetchRequestInit = options;
    for (const interceptor of this.interceptors.request) {
      mergedOptions = await interceptor(mergedOptions);
    }

    try {
      const response = await fetch(url, mergedOptions);
      const responseData: T = await response.json();

      // 处理响应拦截器
      let processedResponse: HttpResponse<T> = {
        data: responseData,
        status: response.status,
        headers: response.headers,
        ok: response.ok,
      };

      for (const interceptor of this.interceptors.response) {
        processedResponse = await interceptor(processedResponse);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return processedResponse;
    } catch (error) {
      throw error;
    }
  }

  get<T = any>(endpoint: string, options?: FetchRequestInit): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T = any>(endpoint: string, body: any, options?: FetchRequestInit) {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });
  }

  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor<T = any>(interceptor: ResponseInterceptor<T>): void {
    this.interceptors.response.push(interceptor);
  }
}

export default HttpClient;

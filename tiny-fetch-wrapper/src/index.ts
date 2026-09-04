export interface FetchOptions extends RequestInit {
  retryCount?: number;
  retryDelay?: number;
  timeout?: number;
}

export class FetchError extends Error {
  public response: Response;
  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export async function tinyFetch(url: string, options: FetchOptions = {}): Promise<any> {
  const { retryCount = 0, retryDelay = 1000, timeout = 10000, ...fetchOptions } = options;

  let attempt = 0;
  while (attempt <= retryCount) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, { ...fetchOptions, signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new FetchError(`HTTP error! status: ${response.status}`, response);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      return response.text();
    } catch (error: any) {
      if (attempt >= retryCount) throw error;
      attempt++;
      await new Promise(res => setTimeout(res, retryDelay));
    }
  }
}

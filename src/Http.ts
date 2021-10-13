import HttpResponse from './HttpResponse';

class Http {
  static defaultHeaders(): Headers {
    const headers = new Headers({
      Accept: 'application/json',
    });

    return headers;
  }

  static jsonHeaders(): Headers {
    const headers = Http.defaultHeaders();

    headers.append('Content-Type', 'application/json');

    return headers;
  }

  static async fetch<Res>(url: string, options?: RequestInit): Promise<HttpResponse<Res>> {
    const res = await fetch(url, options);

    const response = new HttpResponse<Res>(res);

    await response.check();

    return response;
  }

  static async patch<Req, Res>(url: string, body: Req): Promise<HttpResponse<Res>> {
    return (
      Http.fetch<Res>(url, {
        method: 'PATCH',
        headers: Http.jsonHeaders(),
        body: JSON.stringify(body),
      })
    )
  }

  static async put<Req, Res>(url: string, body: Req): Promise<HttpResponse<Res>> {
    return (
      Http.fetch<Res>(url, {
        method: 'PUT',
        headers: Http.jsonHeaders(),
        body: JSON.stringify(body),
      })
    )
  }

  static async get<Res>(url: string): Promise<HttpResponse<Res>> {
    return (
      Http.fetch<Res>(url, {
        method: 'GET',
        headers: Http.defaultHeaders(),
      })
    )
  }

  static async delete(url: string): Promise<HttpResponse> {
    return (
      Http.fetch(url, {
        method: 'DELETE',
        headers: Http.defaultHeaders(),
      })
    )
  }

  static async post<Req, Res>(url: string, body?: Req): Promise<HttpResponse<Res>> {
    if (body === undefined) {
      return Http.fetch<Res>(url, {
        method: 'POST',
        headers: Http.defaultHeaders(),
      });
    }

    return Http.fetch<Res>(url, {
      method: 'POST',
      headers: Http.jsonHeaders(),
      body: JSON.stringify(body),
    });
  }

  static async postForm<Res>(url: string, form: FormData): Promise<HttpResponse<Res>> {
    return (
      Http.fetch<Res>(url, {
        method: 'POST',
        headers: Http.jsonHeaders(),
        body: form,
      })
    )
  }
}

export default Http;

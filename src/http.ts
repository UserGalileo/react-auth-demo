function getCookie(name: string) {
  function escape(s: string) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

let csrfToken: string | null = null;

async function http<T>(path: string, config: RequestInit): Promise<T> {
  let headers: any = {
    'Content-Type': 'application/json',
  }
  if (csrfToken) headers['X-XSRF-TOKEN'] = csrfToken;
  let newConfig = { ...config, headers, credentials: 'include' as const };
  let request = new Request(path, { ...newConfig });

  const response = await fetch(request);

  if(!response.ok) {
    throw new Error(response.statusText);
  }

  const token = getCookie('XSRF-TOKEN') || null;
  if (token) csrfToken = token;

  // may error if there is no body, return empty array
  return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = {method: 'get', ...config}
  return await http<T>(path, init)
}

export async function post<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = {method: 'post', body: JSON.stringify(body), ...config}
  return await http<U>(path, init)
}

export async function put<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = {method: 'put', body: JSON.stringify(body), ...config}
  return await http<U>(path, init)
}

export async function remove<T>(path: string, config?: RequestInit): Promise<T> {
  const init = {method: 'delete', ...config}
  return await http<T>(path, init);
}

import * as os from 'os';
import * as std from 'std';

export default async function fetch(url, options) {
  if (options) {
    throw new Error('Fetch options not supported');
  }

  function mapToFetchResponse(fullResponse) {
    const {
      responseHeaders,
      status,
      response,
    } = fullResponse;

    const headerEntries = responseHeaders.trim().split('\n').map(line => {
      const [key, value] = line.split(':');
      return [key.trim(), value.trim()];
    });

    return {
      status,
      headers: Object.fromEntries(headerEntries),
      ok: status >= 200 && status <= 299,
      async json() {
        return JSON.parse(response)
      },
      async text() {
        return response;
      }
    }
  }

  return new Promise((resolve, reject) => {
    const worker = new os.Worker(`
      import * as _os from 'os';
      import * as _std from 'std';
      const parent = _os.Worker.parent;
      parent.onmessage = (event) => {
        const [url, options] = event.data;
        const data = _std.urlGet(url, { full: true });
        parent.postMessage(data);
      }
    `);

    worker.onmessage = (event) => {
      if (event.data.status) {
        resolve(mapToFetchResponse(event.data));
      } else {
        reject('Request failed');
      }

      worker.onmessage = null;
    }
    worker.postMessage([url, options]);
  })
}
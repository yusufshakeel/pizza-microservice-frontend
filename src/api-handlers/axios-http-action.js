export default function AxiosHttpAction(axiosInstance) {
  const post = async ({
    method,
    body,
    url,
    headers = {},
    timeout = 5000,
    responseType = 'json'
  }) => {
    try {
      const response = await axiosInstance({
        method,
        url,
        data: body,
        timeout,
        responseType,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return e?.response?.data ?? 'Unknown error';
    }
  };

  const get = async ({ url, headers = {}, timeout = 5000, responseType = 'json' }) => {
    try {
      const response = await axiosInstance({
        method: 'get',
        url,
        timeout,
        responseType,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
      return response.data;
    } catch (e) {
      console.error(e);
      return e?.response?.data ?? 'Unknown error';
    }
  };

  return { post, get };
}

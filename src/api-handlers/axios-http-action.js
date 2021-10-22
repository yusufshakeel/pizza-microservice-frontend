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
      throw e;
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
      throw e;
    }
  };

  return { post, get };
}

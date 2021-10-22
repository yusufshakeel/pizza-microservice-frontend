import AxiosHttpAction from './axios-http-action';

function UserApiHandler({ axiosInstance }) {
  const httpAction = AxiosHttpAction(axiosInstance);
  this.login = async function login({ email, password }) {
    return await httpAction.post({
      method: 'post',
      body: JSON.stringify({
        data: {
          emailAddress: email,
          password: password
        }
      }),
      url: `/user/v1/users/login`
    });
  };
}

export default UserApiHandler;

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

  this.signUp = async function signUp(user) {
    return await httpAction.post({
      method: 'post',
      body: JSON.stringify({
        data: user
      }),
      url: `/user/v1/users`
    });
  };

  this.isEmailAvailable = async function isEmailAvailable(emailAddress) {
    return await httpAction.post({
      method: 'post',
      body: JSON.stringify({
        data: {
          emailAddress
        }
      }),
      url: '/user/v1/users/signup/email-available'
    });
  };

  this.isContactPhoneAvailable = async function isContactPhoneAvailable({
    countryCode,
    phoneNumber
  }) {
    return await httpAction.post({
      method: 'post',
      body: JSON.stringify({
        data: {
          contactPhone: { countryCode, phoneNumber }
        }
      }),
      url: '/user/v1/users/signup/contact-phone-available'
    });
  };

  this.fetchUserDetail = async function fetchUserDetail({ token }) {
    return await httpAction.get({
      headers: { Authorization: `Bearer ${token}` },
      url: `/user/v1/users/account`
    });
  };
}

export default UserApiHandler;

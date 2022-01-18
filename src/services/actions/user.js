import { hideLoader, recoverySuccess, registrationSuccess, requestRecovery, showLoader, signIn, signOut } from ".";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";
import { URL } from "../../utils/data";
import { showNotification } from "./app";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT'; 
export const CHECK_AUTH = 'CHECK_AUTH';
export const REQUEST_RECOVERY = 'REQUEST_RECOVERY';
export const RECOVERY_SUCCESS = 'RECOVERY_SUCCESS';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const checkAuth = () => {
  return (dispatch) => {
    dispatch(showLoader());
    fetch(`${URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(signIn(data.user));
        } else {
          dispatch(refreshToken());
        }
      })
      .catch((err) => {
        dispatch(showNotification('Не удалось получить данные о пользователе!'));
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  }
}

export const refreshToken = () => {
  return dispatch => {
    const refreshToken = getCookie('rtoken');
    if (refreshToken) {
      fetch(`${URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: refreshToken}),
      })
      .then(response => {
        dispatch(hideLoader());
        if (!response.ok) {
          dispatch(showNotification('Не удалось получить данные о пользователе!'))
        }
        return response.json()
      })
      .then(data => {
        if (!data.success) {
          dispatch(showNotification(data.message))
        } else {
          const authToken = data.accessToken.split('Bearer ')[1];
          const refreshToken = data.refreshToken;
          if (authToken) {
            setCookie('token', authToken);
          }
          if (refreshToken) {
            setCookie('rtoken', refreshToken);
          }
          dispatch(checkAuth());
        }
      });
    }
  }
}

export const makeSignIn = (data) => {
  return (dispatch) => {
    fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
      }
      return response.json()
    })
    .then(data => {
      if (!data.success) {
        dispatch(showNotification(data.message))
      } else {
        const authToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        if (authToken) {
          setCookie('token', authToken);
        }
        if (refreshToken) {
          setCookie('rtoken', refreshToken);
        }
        dispatch(signIn({
          ...data.user,
          password: data.password,
        }))
      }
    });
  }
}

export const makeSignOut = () => {
  return (dispatch) => {
    fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token: getCookie('rtoken')}),
    })
    .then(response => {
      if (!response.ok) {
        dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
      }
      return response.json()
    })
    .then(data => {
      if (!data.success) {
        dispatch(showNotification(data.message))
      } else {
        deleteCookie('token');
        deleteCookie('rtoken');
        dispatch(signOut());
      }
    });
  }
}

export const requestPasswordRecovery = (mail) => {
  return dispatch => {
    fetch(`${URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: mail}),
    })
    .then(response => {
      if (!response.ok) {
        dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
      }
      return response.json()
    })
    .then(data => {
      if (!data.success) {
        dispatch(showNotification(data.message))
      } else {
        dispatch(requestRecovery())
        dispatch(showNotification('На вашу почту отправлен код для восстановления пароля'))
      }
    });

  }
}

export const resetPassword = (data) => {
  return dispatch => {
    fetch(`${URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password: data.password, token: data.code}),
    })
    .then(response => {
      if (!response.ok) {
        dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
      }
      return response.json()
    })
    .then(data => {
      if (!data.success) {
        dispatch(showNotification(data.message))
      } else {
        dispatch(showNotification('Пароль успешно изменен!'))
        dispatch(recoverySuccess())
      }
    });

  }
}

export const registerUser = (data) => {
  return dispatch => {
    fetch(`${URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
      }
      return response.json()
    })
    .then(data => {
      if (!data.success) {
        dispatch(showNotification(data.message))
      } else {
        dispatch(showNotification('Регистрация прошла успешно. Вы можете войти под своими учетными данными!'))
        setTimeout(() => {
          dispatch(registrationSuccess())
        }, 1000);
      }
    });
  }
}

export const updateUser = (data) => {
  return dispatch => {
    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'))
      }
      return response.json()
    })
    .then(data => {
      if (!data.success) {
        dispatch(showNotification(data.message))
      } else {
        dispatch(showNotification('Данные пользователя успешно обновлены!'))
      }
    });
  }
};
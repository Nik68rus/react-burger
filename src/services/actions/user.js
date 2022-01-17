import { deleteCookie, getCookie, setCookie } from "../../utils/cookies";
import { URL } from "../../utils/data";
import { HIDE_LOADER, showNotification, SHOW_LOADER } from "./app";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT'; 
export const CHECK_AUTH = 'CHECK_AUTH';
export const REQUEST_RECOVERY = 'REQUEST_RECOVERY';
export const RECOVERY_SUCCESS = 'RECOVERY_SUCCESS';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';

export const checkAuth = () => {
  return (dispatch) => {
    dispatch({type: SHOW_LOADER});
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
        dispatch({type: HIDE_LOADER});
        if (data.success) {
          dispatch({type: SIGN_IN, payload: {...data.user, isAuthorized: true}});
        } else {
          dispatch(refreshToken());
        }
      })
      .catch((err) => {
        dispatch({type: HIDE_LOADER});
        dispatch(showNotification('Не удалось получить данные о пользователе!'));
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
        dispatch({type: HIDE_LOADER});
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

export const signIn = (data) => {
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
        dispatch({type: SIGN_IN, payload: {
          ...data.user,
          password: data.password
        }})
      }
    });
  }
}

export const signOut = () => {
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
        dispatch({type: SIGN_OUT});
      }
    });
  }
}

export const requestRecovery = (mail) => {
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
        dispatch({type: REQUEST_RECOVERY})
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
        dispatch({type: RECOVERY_SUCCESS})
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
          dispatch({type: REGISTRATION_SUCCESS})
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
        dispatch(showNotification('Данные пользователя успешно обьновлены!'))
      }
    });
  }
};
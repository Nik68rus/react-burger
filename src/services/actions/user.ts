import { AppThunk, TRegistrationData, TResetData } from './../../types/index';
import {
  hideLoader,
  recoverySuccess,
  registrationSuccess,
  requestRecovery,
  showLoader,
  signIn,
  signOut,
} from '.';
import { AppDispatch, TUserData } from '../../types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import { URL } from '../../utils/data';
import { showNotification } from './app';

export const SIGN_IN: 'SIGN_IN' = 'SIGN_IN';
export const SIGN_OUT: 'SIGN_OUT' = 'SIGN_OUT';
export const CHECK_AUTH: 'CHECK_AUTH' = 'CHECK_AUTH';
export const REQUEST_RECOVERY: 'REQUEST_RECOVERY' = 'REQUEST_RECOVERY';
export const RECOVERY_SUCCESS: 'RECOVERY_SUCCESS' = 'RECOVERY_SUCCESS';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' =
  'REGISTRATION_SUCCESS';

export interface ISignInAction {
  readonly type: typeof SIGN_IN;
  readonly payload: TUserData;
}

export interface ISignOutAction {
  readonly type: typeof SIGN_OUT;
}

export interface IRequestRecoveryAction {
  readonly type: typeof REQUEST_RECOVERY;
}

export interface IRecoverySuccessAction {
  readonly type: typeof RECOVERY_SUCCESS;
}

export interface IRegistrationSuccessAction {
  readonly type: typeof REGISTRATION_SUCCESS;
}

export type TUserActions =
  | ISignInAction
  | ISignOutAction
  | IRequestRecoveryAction
  | IRecoverySuccessAction
  | IRegistrationSuccessAction;

export const checkAuth: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(showLoader());
    fetch(`${URL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
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
        dispatch(
          showNotification('Не удалось получить данные о пользователе!')
        );
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };
};

export const refreshToken: AppThunk = () => (dispatch: AppDispatch) => {
  const refreshToken = getCookie('rtoken');
  if (refreshToken) {
    fetch(`${URL}/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: refreshToken }),
    })
      .then((response) => {
        dispatch(hideLoader());
        if (!response.ok) {
          dispatch(
            showNotification('Не удалось получить данные о пользователе!')
          );
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
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
};

export const makeSignIn: AppThunk = (data: TUserData) => {
  return (dispatch: AppDispatch) => {
    fetch(`${URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'));
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
        } else {
          const authToken = data.accessToken.split('Bearer ')[1];
          const refreshToken = data.refreshToken;
          if (authToken) {
            setCookie('token', authToken);
          }
          if (refreshToken) {
            setCookie('rtoken', refreshToken);
          }
          dispatch(
            signIn({
              ...data.user,
              password: data.password,
            })
          );
        }
      });
  };
};

export const makeSignOut: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    fetch(`${URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie('rtoken') }),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'));
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
        } else {
          deleteCookie('token');
          deleteCookie('rtoken');
          dispatch(signOut());
        }
      });
  };
};

export const requestPasswordRecovery: AppThunk = (mail: string) => {
  return (dispatch: AppDispatch) => {
    fetch(`${URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail }),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'));
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
        } else {
          dispatch(requestRecovery());
          dispatch(
            showNotification(
              'На вашу почту отправлен код для восстановления пароля'
            )
          );
        }
      });
  };
};

export const resetPassword: AppThunk = (data: TResetData) => {
  return (dispatch: AppDispatch) => {
    fetch(`${URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: data.password, token: data.code }),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'));
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
        } else {
          dispatch(showNotification('Пароль успешно изменен!'));
          dispatch(recoverySuccess());
        }
      });
  };
};

export const registerUser: AppThunk = (data: TRegistrationData) => {
  return (dispatch: AppDispatch) => {
    fetch(`${URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'));
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
        } else {
          dispatch(
            showNotification(
              'Регистрация прошла успешно. Вы можете войти под своими учетными данными!'
            )
          );
          setTimeout(() => {
            dispatch(registrationSuccess());
          }, 1000);
        }
      });
  };
};

export const updateUser: AppThunk = (data: TRegistrationData) => {
  return (dispatch: AppDispatch) => {
    fetch(`${URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + getCookie('token'),
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(showNotification('Что-то пошло не так. Попробуйте позже!'));
        }
        return response.json();
      })
      .then((data) => {
        if (!data.success) {
          dispatch(showNotification(data.message));
        } else {
          dispatch(showNotification('Данные пользователя успешно обновлены!'));
        }
      });
  };
};

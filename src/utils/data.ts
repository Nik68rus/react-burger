const URL = 'https://norma.nomoreparties.space/api';
const WS_URL = 'wss://norma.nomoreparties.space/orders';


const Paths = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT: '/forgot-password',
  RESET: '/reset-password',
  PROFILE: '/profile',
  ORDERS: '/profile/orders',
  INGREDIENTS: '/ingredients',
  FEED: '/feed'
}

const Status = {
  done: 'Выполнен',
  created: 'Создан',
  pending: 'Готовится',
};

export {URL, WS_URL, Paths, Status};
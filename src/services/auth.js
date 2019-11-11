export const TOKEN_KEY = "userToken";
export const USER_CLIENT = "userClient";
export const USER_ID = "userID";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = (token, userClient, userId) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_CLIENT, userClient)
  localStorage.setItem(USER_ID, userId)
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_CLIENT)
  localStorage.removeItem(USER_ID)
};
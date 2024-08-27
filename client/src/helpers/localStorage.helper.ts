export const getTokenFromLocalStorage = () => {
  const data = localStorage.getItem("token");
  const token = data ? JSON.parse(data) : "";

  return token;
};

export const setTokenToLocalStorage = (key: string, token: string) => {
  localStorage.setItem(key, JSON.stringify(token));
};

export const removeTokenFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export type IAuthResponse = {
  _id: string;
  email: string;
  accessToken: string;
};

export type IAuthDto = {
  email: string;
  password: string;
};

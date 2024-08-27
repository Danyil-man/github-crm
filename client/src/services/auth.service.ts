import { instanceApi } from "../api/axios.api";
import { IAuthDto, IAuthResponse } from "../types/IAuth";

export const AuthService = {
  async registration(userData: IAuthDto): Promise<IAuthResponse> {
    const { data } = await instanceApi.post<IAuthResponse>(
      "/auth/register",
      userData
    );
    return data;
  },
  async login(userData: IAuthDto): Promise<IAuthResponse> {
    const { data } = await instanceApi.post<IAuthResponse>(
      "/auth/login",
      userData
    );
    return data;
  },
  async getMe(): Promise<IAuthResponse | undefined> {
    const { data } = await instanceApi.get<IAuthResponse>("/auth/profile");
    return data;
  },
};

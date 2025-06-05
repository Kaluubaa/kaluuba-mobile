import { api } from './api';
import { ProfileResponse } from '~/types/user';

export const profileService = {
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await api.get<ProfileResponse>('/user/profile/me');
    return response.data;
  },
}; 
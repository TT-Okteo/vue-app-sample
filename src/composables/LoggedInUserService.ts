import type { LoggedInUserModel } from '@/models';
import { ref } from 'vue';

const loggedInUser = ref<LoggedInUserModel>({});

export function useLoggedInUserService() {
  return {
    loggedInUser,
  };
}

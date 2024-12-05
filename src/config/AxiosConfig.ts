import axios, { type AxiosError } from 'axios';
import { useDateUtils } from '@/utils/DateUtils';
import { useErrorService } from '@/composables/ErrorService';
import type { ErrorWrapperModel } from '@/models';

const { convertStringDatesToJS } = useDateUtils();

const { displayErrorDialog, errorLabel } = useErrorService();

const axiosInstance = axios.create({});

// axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
//   // Do something before request is sent
//   return config;
// });

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    response.data = convertStringDatesToJS(response.data);
    return response;
  },
  (error: AxiosError) => {
    // Gestion des erreurs provenant de l'API
    const errorWrapper = error.response?.data as ErrorWrapperModel;

    if (error.response?.status !== 500 && errorWrapper.error?.message) {
      errorLabel.value = errorWrapper.error.message as unknown as string;
    }
    displayErrorDialog.value = true;

    return Promise.reject(error);
  },
);

export default axiosInstance;

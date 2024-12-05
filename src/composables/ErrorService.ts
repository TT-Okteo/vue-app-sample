import { ref } from 'vue';

const displayErrorDialog = ref(false);
const errorLabel = ref('');

export function useErrorService() {
  return {
    displayErrorDialog,
    errorLabel,
  };
}

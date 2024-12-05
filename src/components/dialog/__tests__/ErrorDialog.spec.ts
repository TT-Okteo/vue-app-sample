import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorDialog from '../ErrorDialog.vue';
import { nextTick, ref } from 'vue';
import PButton from 'primevue/button';
import PDialog from 'primevue/dialog';
import PrimeVue from 'primevue/config';

const displayErrorDialog = ref(true);
const errorLabel = ref('');

function errorDialogWrapper() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return mount<any>(ErrorDialog, {
    components: { PButton, PDialog },
    props: { displayErrorDialog: displayErrorDialog.value, errorLabel: errorLabel.value },
    global: {
      stubs: {
        teleport: true,
      },
      plugins: [PrimeVue],
    },
  });
}

describe('ErrorDialog.vue', () => {
  beforeEach(() => {
    // Permet de reset à true la prop 'displayErrorDialog' avant chaque test
    displayErrorDialog.value = true;
  });

  // PDialog
  test('the dialog should not be visible when the prop `displayErrorDialog` is false', async () => {
    const wrapper = errorDialogWrapper();
    const dialog = wrapper.findComponent({ name: 'Dialog' });

    expect(dialog.props('visible')).toBe(true);

    wrapper.setProps({ displayErrorDialog: false });
    await nextTick();

    expect(dialog.props('visible')).toBe(false);
  });

  // Header
  test('should display a header `Erreur`', async () => {
    const wrapper = errorDialogWrapper();
    await nextTick();

    expect(wrapper.get('.p-dialog-header').text()).toBe('Erreur');

    const dialog = wrapper.findComponent({ name: 'Dialog' });

    expect(dialog.props('header')).toBe('Erreur');
  });

  // #errorLabel
  test('the div `#errorLabel` should display the right text', async () => {
    const wrapper = errorDialogWrapper();
    await nextTick();

    wrapper.setProps({ errorLabel: "L'utilisateur est inconnu." });
    await nextTick();

    expect(wrapper.get('#errorLabel').text()).toBe("L'utilisateur est inconnu.");

    wrapper.setProps({ errorLabel: '' });
    await nextTick();

    expect(wrapper.get('#errorLabel').text()).toBe("Une erreur s'est produite.");
  });

  // Bouton #errorDialogCloseBtn
  test('the button `#errorDialogCloseBtn` should have a label `Fermer`', async () => {
    const wrapper = errorDialogWrapper();
    await nextTick();

    expect(wrapper.get('#errorDialogCloseBtn').text()).toBe('Fermer');
  });

  test('should trigger the function `closeDialog()` clicking the button `#errorDialogCloseBtn`', async () => {
    const closeDialog = vi.fn();
    const wrapper = mount(ErrorDialog, {
      components: { PButton, PDialog },
      props: { displayErrorDialog: displayErrorDialog.value, errorLabel: errorLabel.value },
      global: {
        stubs: {
          teleport: true,
        },
        plugins: [PrimeVue],
        mocks: { closeDialog },
      },
    });

    // Permet d'attendre la prise en compte de la prop `displayErrorDialog`
    await nextTick();

    const errorDialogCloseBtn = wrapper.get('#errorDialogCloseBtn');

    await errorDialogCloseBtn.trigger('click');

    expect(closeDialog).toHaveBeenCalledOnce();
  });

  
});

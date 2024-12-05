import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import CustomConfirmDialog from '../CustomConfirmDialog.vue';
import PDialog from 'primevue/dialog';
import PButton from 'primevue/button';
import PrimeVue from 'primevue/config';
import { nextTick, ref } from 'vue';

const displayConfirmDialog = ref(true);
const confirmLabel = ref('');

function customConfirmDialogWrapper() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return mount<any>(CustomConfirmDialog, {
    components: { PButton, PDialog },
    props: { displayConfirmDialog: displayConfirmDialog.value, confirmLabel: confirmLabel.value },
    global: {
      stubs: {
        teleport: true,
      },
      plugins: [PrimeVue],
    },
  });
}

describe('CustomConfirmDialog.vue', () => {
  beforeEach(() => {
    // Permet de reset à true la prop 'displayConfirmDialog' avant chaque test
    displayConfirmDialog.value = true;
  });

  // PDialog
  test('the dialog should not be visible when the prop `displayConfirmDialog` is false', async () => {
    const wrapper = customConfirmDialogWrapper();
    const dialog = wrapper.findComponent({ name: 'Dialog' });

    expect(dialog.props('visible')).toBe(true);

    wrapper.setProps({ displayConfirmDialog: false });
    await nextTick();

    expect(dialog.props('visible')).toBe(false);
  });

  // Header
  test('should display a header `Confirmation`', async () => {
    const wrapper = customConfirmDialogWrapper();
    await nextTick();

    expect(wrapper.get('.p-dialog-header').text()).toBe('Confirmation');

    const dialog = wrapper.findComponent({ name: 'Dialog' });

    expect(dialog.props('header')).toBe('Confirmation');
  });

  // #confirmLabel
  test('the div `#confirmLabel` should display the right text', async () => {
    const wrapper = customConfirmDialogWrapper();
    await nextTick();

    wrapper.setProps({ confirmLabel: 'Souhaitez-vous confirmer ?' });
    await nextTick();

    expect(wrapper.get('#confirmLabel').text()).toBe('Souhaitez-vous confirmer ?');
  });

  // Bouton #cancelBtn
  test('`#cancelBtn` should have a dynamic label', async () => {
    const wrapper = customConfirmDialogWrapper();
    await nextTick();

    wrapper.setProps({ cancelBtnLabel: undefined });
    await nextTick();

    expect(wrapper.get('#cancelBtn').text()).toBe('Cancel');

    wrapper.setProps({ cancelBtnLabel: 'Annuler' });
    await nextTick();

    expect(wrapper.get('#cancelBtn').text()).toBe('Annuler');
  });

  test('should trigger the function `cancel()` clicking the button `#cancelBtn`', async () => {
    const cancel = vi.fn();
    const wrapper = mount(CustomConfirmDialog, {
      components: { PButton, PDialog },
      props: { displayConfirmDialog: displayConfirmDialog.value, confirmLabel: confirmLabel.value },
      global: {
        stubs: {
          teleport: true,
        },
        plugins: [PrimeVue],
        mocks: { cancel },
      },
    });

    // Permet d'attendre la prise en compte de la prop `displayConfirmDialog`
    await nextTick();

    const cancelBtn = wrapper.get('#cancelBtn');

    await cancelBtn.trigger('click');

    expect(cancel).toHaveBeenCalledOnce();
  });

  // Bouton #confirmBtn
  test('`#confirmBtn` should have a dynamic label', async () => {
    const wrapper = customConfirmDialogWrapper();
    await nextTick();

    wrapper.setProps({ confirmBtnLabel: undefined });
    await nextTick();

    expect(wrapper.get('#confirmBtn').text()).toBe('Confirm');

    wrapper.setProps({ confirmBtnLabel: 'Ok' });
    await nextTick();

    expect(wrapper.get('#confirmBtn').text()).toBe('Ok');
  });

  test('should trigger the function `confirm()` clicking the button `#confirmBtn`', async () => {
    const confirm = vi.fn();
    const wrapper = mount(CustomConfirmDialog, {
      components: { PButton, PDialog },
      props: { displayConfirmDialog: displayConfirmDialog.value, confirmLabel: confirmLabel.value },
      global: {
        stubs: {
          teleport: true,
        },
        plugins: [PrimeVue],
        mocks: { confirm },
      },
    });

    // Permet d'attendre la prise en compte de la prop `displayConfirmDialog`
    await nextTick();

    const confirmBtn = wrapper.get('#confirmBtn');

    await confirmBtn.trigger('click');

    expect(confirm).toHaveBeenCalledOnce();
  });

});

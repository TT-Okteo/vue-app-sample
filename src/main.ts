import { createApp } from 'vue';
import App from '@/App.vue';
import router from './router';
import { useLoggedInUserService } from '@/composables/LoggedInUserService';
import PrimeVueCustomThemePreset from '@/config/PrimeVueCustomThemePreset';
import Locale_FR from '@/config/Locale_FR.json';

import Message from 'primevue/message';
import Button from 'primevue/button';
import Card from 'primevue/card';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import Avatar from 'primevue/avatar';
import ToggleSwitch from 'primevue/toggleswitch';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import Badge from 'primevue/badge';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import Select from 'primevue/select';
import AutoComplete from 'primevue/autocomplete';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import ProgressBar from 'primevue/progressbar';
import DatePicker from 'primevue/datepicker';
import Slider from 'primevue/slider';
import MultiSelect from 'primevue/multiselect';
import Menu from 'primevue/menu';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';
import Tooltip from 'primevue/tooltip';
import Checkbox from 'primevue/checkbox';

import LoadingSpinner from './components/ui-elements/LoadingSpinner.vue';

import 'primeicons/primeicons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@/assets/styles/index.css';

const { loggedInUser } = useLoggedInUserService();

loggedInUser.value.username = 'JohnDoe';
loggedInUser.value.token = 'expected_token';
loggedInUser.value.lastName = 'Doe';
loggedInUser.value.firstName = 'John';

const app = createApp(App);

app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: PrimeVueCustomThemePreset,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  } , locale: Locale_FR,
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);

app.directive('ripple', Ripple);
app.directive('styleclass', StyleClass);
app.directive('tooltip', Tooltip);

// PrimeVue components
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('PButton', Button);
app.component('Card', Card);
app.component('ToggleSwitch', ToggleSwitch);
app.component('Message', Message);
app.component('PDialog', Dialog);
app.component('ConfirmPopup', ConfirmPopup);
app.component('Toast', Toast);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Tag', Tag);
app.component('PSelect', Select);
app.component('AutoComplete', AutoComplete);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('ProgressBar', ProgressBar);
app.component('DatePicker', DatePicker);
app.component('Slider', Slider);
app.component('MultiSelect', MultiSelect);
app.component('PMenu', Menu);
app.component('RadioButton', RadioButton);
app.component('PTextarea', Textarea);
app.component('Checkbox', Checkbox);

// Global custom components
app.component('LoadingSpinner', LoadingSpinner);

app.mount('#app');

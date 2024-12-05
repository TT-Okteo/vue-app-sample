import { localize } from '@vee-validate/i18n';
import { max, required } from '@vee-validate/rules';
import { configure, defineRule } from 'vee-validate';

defineRule('required', required);
defineRule('max', max);
defineRule('greater_than_or_equal_to_zero', (value: number) => {
  return !value || value >= 0;
});

configure({
  validateOnInput: true,
  generateMessage: localize({
    fr: {
      messages: {
        required: (context) => `Le champ ${context.label} est obligatoire.`,
        max: (context) => `Le champ est limité à ${(context.rule!.params as Array<number>)[0]} caractères.`,
        greater_than_or_equal_to_zero: () => 'Le nombre saisi doit être un entier positif.',
      },
    },
    en: {
      messages: {
        required: (context) => `The field ${context.label} is required.`,
        max: (context) => `The maximum number of characters allowed is ${(context.rule!.params as Array<number>)[0]}.`,
        greater_than_or_equal_to_zero: () => 'This number has to be a positive integer.',
      },
    },
  }),
});

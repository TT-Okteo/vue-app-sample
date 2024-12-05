# Projet Vue.js pour Test Technique

## Description

Ce projet est une application **Vue.js** développée avec **TypeScript** et utilisant la bibliothèque de composants **PrimeVue**. L'objectif de cet exercice est d'étendre le projet existant en ajoutant deux nouvelles pages.

Le projet contient:

- [Vue.js 3.+](https://vuejs.org/) (Composition API, syntaxe script setup)
- [Vue Router](https://router.vuejs.org/) : système de routeur de Vue.js
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) : outil de build
- [Vitest](https://vitest.dev/) et [vue-test-utils](https://test-utils.vuejs.org/) : tests unitaires
- [Prettier](https://prettier.io/) : formattage de code
- [ESLint](https://eslint.org/) : linter
- [Tailwind CSS](https://tailwindcss.com/) : framework CSS
- [tailwindcss-primeui](https://github.com/primefaces/tailwindcss-primeui) : plugin Tailwind CSS ajoutant des classes pour les thèmes PrimeVue
- [PrimeVue](https://primefaces.org/primevue/) : librairie de composants
- [VeeValidate](https://vee-validate.logaretm.com/v4/) : validation des formulaires
- [axios](https://axios-http.com/fr/docs/intro) : client HTTP
- [Font Awesome](https://fontawesome.com/v5/search) : librairie d'icônes
- [PrimeIcons](https://primefaces.org/primevue/icons) : librairie d'icônes
- [date-fns](https://date-fns.org/) : librairie utilitaire pour les dates

---

## Installation du Projet

### Prérequis

- **Node.js** (version LTS recommandée)
- **npm** (installé avec Node.js)

### Installation et Lancement

Exécutez les commandes suivantes pour installer et démarrer le projet :

```bash
npm install
npm run dev
```


---

## Environnement de développement recommandé

### IDE :

[VSCode](https://code.visualstudio.com/)

### Extensions :

- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=vue.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vitest](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)

## Commandes utiles

### Installation du projet

```sh
pnpm install
```

### Compiler le projet et lancer le serveur de développement

```sh
pnpm dev
```

### Lancer une vérification des types TypeScript

```sh
npm typecheck
```

### Lancer un scan du linter [ESLint](https://eslint.org/)

```sh
npm lint
```

Pour réparer automatiquement les problèmes détéctés par le scan:

```sh
npm lint:fix
```

### Vérification des types, compilation et minification pour la mise en production

```sh
pnpm build
```

### Lancer les tests unitaires avec [Vitest](https://vitest.dev/)

```sh
npm test:unit
npm test:unit:cov # pour avoir le coverage
```

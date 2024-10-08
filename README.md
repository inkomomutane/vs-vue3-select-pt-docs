# Vs Vue3 Select

![Current Release](https://img.shields.io/github/release/voral/vs-vue3-select.svg)
![Release Date](https://img.shields.io/github/release-date/voral/vs-vue3-select)
![Monthly Downloads](https://img.shields.io/npm/dm/vs-vue3-select.svg)
![min gzipped size](https://img.shields.io/bundlejs/size/vs-vue3-select)
![MIT License](https://img.shields.io/github/license/voral/vs-vue3-select.svg)
[![Coverage Status](https://coveralls.io/repos/github/Voral/vs-vue3-select/badge.svg?branch=main)](https://coveralls.io/github/Voral/vs-vue3-select?branch=main)


Vs Vue3 Select is a feature rich select/dropdown/typeahead component. It provides a
default template that fits most use cases for a filterable select dropdown. The
component is designed to be as lightweight as possible, while maintaining high
standards for accessibility.

This is a fork of a popular component that has not been maintained for a long time. The component has been enhanced with
additional functionality and will continue to evolve and receive updates.

Fork history:

- [sagalbot/vue-select](https://github.com/sagalbot/vue-select) v4.0.0-beta.6
- [howard-tzw/vue3-select](https://github.com/howard-tzw/vue3-select) v0.1.2

## Features

- Tags input
- Filtering / Searching
- Vuex/Pinia Support
- AJAX Support
- SSR Support
- Accessible
- ~20kb Total / ~5kb CSS / ~15kb JS
- Select Single/Multiple Options
- Customizable with slots and CSS variables
- Zero dependencies

### Documentation and examples

- **[API Documentation](https://vue3-select.va-soft.ru)**
- **[CodePen Template](https://codepen.io/vasoft/pen/JjxVrVM)**
- **[Collection of examples](https://codepen.io/collection/aMPBbR)**

## Install

```bash
npm install vs-vue3-select
```

Then, import and register the component:

```js
import Vue from 'vue'
import VueSelect from 'vs-vue3-select'
import 'vs-vue3-select/dist/vs-vue3-select.css'

app.component('v-select', VueSelect)
```

## License

[MIT](https://github.com/Voral/vs-vue3-select/blob/main/LICENSE.md)


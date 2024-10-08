---
title: Работа со значением
head:
  - [ meta, { name: title , content: Vs Vue3 Select Работа со значением} ]
  - [ meta, { name: og:title , content: Vs Vue3 Select Работа со значением} ]
  - [ meta, { name: description , content: Взаимодействие с результирующим значением поля ввода Vs Vue3 Select} ]
  - [ meta, { name: og:description , content: Взаимодействие с результирующим значением поля ввода Vs Vue3 Select} ]
  - [ meta, { name: og:url , content: https://vue3-select.va-soft.ru/ru/start/values/ } ]
  - [ link, { rel: canonical , href: https://vue3-select.va-soft.ru/ru/start/values/ } ]
  - [ meta, { name: keywords , content: "select,select input,multiselect,vue,vue3,vue3 component,vue3 select,dropdown"} ]
sidebarDepth: 0
prev:
  text: Выпадающий список
  link: /ru/start/options/
next:
  text: TypeScript и типы
  link: /ru/start/ts/
---

# Работа со значением

## Получение и передача 

### Свойство `v-model`
___

Наиболее распространенным вариантом использования `vs-vue3-select` является синхронизация выбранного значения с 
родительским компонентом. `vs-vue3-select` использует синтаксис `v-model` для синхронизации значений с родительским
компонентом. Синтаксис `v-model` работает с примитивами и объектами.

```html
<v-select v-model="selected" />
```

Если компонент в режиме мультивыбора `multiple`,  `v-model` всегда будет массивом.

## Свойства и события

Иногда `v-model` может не подойти. Например, при работе с [Vuex](https://vuex.vuejs.org) вам нужно будет инициировать 
мутацию, а не изменять значение напрямую. В этом случае, возможно, вам нужно привязать предварительно выбранное значение
и запустить мутацию при его изменении.

В этом случае можно использовать свойство `value` и событие `update:model-value`. Эта комбинация также является 
способом, с помощью которого Vue подключает синтаксис `v-model` внутри.

### Свойство `value`

Параметр `value` позволяет указать `vs-vue3-select` узнать, какое значение выбрано в данный момент. Он будет принимать 
строки, числа или объекты. Если вы используете множественный `v-select`, вам нужно будет передать массив.

```html
<v-select :value="selected" />
```

::: tip 🤓 
Каждый раз когда вы используете свойство `value`, вы должны самостоятельно обновлять связанную переменную родительского 
компонента при помощи обработчика события `update:model-value`.
:::

### Событие: `update:model-value`

Событие `update:model-value` запускается всякий раз, когда изменяется значение, и передается с состоянием значения в
качестве единственного параметра.

## Простой и множественный выбор

По умолчанию `vs-vue3-select` настрое на выбор одного значения. Если вам нужно несколько значений, используйте свойство 
`multiple` `boolean`, точно так же, как если бы использовали для элемента HTML `<select>`. Когда значение `multiple`
равно true, `v-модель` и `value` должны быть массивом.

```html
<v-select multiple v-model="selected" :options="['Canada','United States']" />
```

<v-select multiple :options="['Canada','United States']" />

## Преобразование выбранного значения

Когда массив `options` содержит объекты, `vs-vue3-select` возвращает весь объект в качестве выбранного значения.
Этот подход не делает предположений о необходимых вам данных и обеспечивает большую гибкость. Однако будут ситуации, 
когда вам просто нужно вернуть только один ключ из объекта.

### Возвращение одного ключа при помощи `reduce`

Если вам нужно вернуть один ключ или преобразовать выбранный объект перед его синхронизацией, `vs-vue3-select` 
предоставляет свойство `reduce` принимающее функцию обратного вызова, которая преобразует выбранную опцию до того,
как она будет передан событию `update:model-value`. 

Рассмотрим структуру данных:

```js
let options = [{ code: 'CA', country: 'Canada' }]
```

Если вы хотите отображать `country`, но возвращать `code` в `v-model`, то можете  использовать свойство `reduce` для
получения только тех данные, которые необходимы.

```html
<v-select
  :options="options"
  :reduce="country => country.code"
  label="country"
/>
```

### Глубоко вложенные значения

Свойство `reduce` точно так же можно использовать и для объектов с глубокой вложенностью:

```
{
  country: 'canada',
  meta: {
    code: 'ca'
    provinces: [...],
  }
}
```

```html
<v-select
  :options="options"
  :reduce="country => country.meta.code"
  label="country"
/>
```

 <reducer-nested-value />

## Предостережения по работе `reduce`

Наиболее распространенная проблема с `reduce` заключается в том, что компонент отображает ваше преобразованное значение 
вместо его необходимой метки выбранного свойства. Это происходит, когда вы предоставляете Vs Vue3 Select связку `value`
или `v-model` с преобразованным значением, но полный объект отсутствует в массиве `options`.

<ReducedWithNoMatchingOption />

@[code](../../../.vuepress/components/ReducedWithNoMatchingOption.vue)

В приведенном выше примере компоненту был предоставлен идентификатор, которого нет в массиве параметров. При изменении
значения Vs Vue3 Select выполняет поиск по предоставленным параметрам, запуская каждый из них через reduce, пока не 
будет найден соответствующий параметр. Если этот параметр не существует, Vs Vue3 Select в конечном итоге отобразит
указанное значение.

## Ввод данных отсутствующих в списке

Чтобы разрешить ввод данных, отсутствующих в параметрах, установите для параметра `taggable` значение true.

```html
<v-select taggable multiple />
```

<v-select taggable multiple />

Если вы хотите, чтобы добавленные теги добавлялись в массив параметров, установите для параметра `push-tags` значение
true.

```html
<v-select taggable multiple push-tags />
```

<v-select taggable multiple push-tags />

### Совместное использование `taggable` и `reduce`

При объединении `taggable` с `reduce` вы должны определить параметр `CreateOption`. Функция `CreateOption` отвечает за
определение структуры объектов, которые Vs Vue3 Select создаст при добавлении тега. Он должен возвращать значение, 
обладающее теми же свойствами, что и остальные ваши опции.

Если вы не определите `CreateOption`, Vs Vue3 Select создаст простой объект, со следующей структурой:
`{[this.label]: searchText}`. Если вы используете reduce, то, вероятно, это не то, как выглядят ваши опции, поэтому вам
нужно будет установить функцию самостоятельно.

**Пример**

У нас есть возможность выбора тегов для добавления книг в коллекцию. Мы просто заботимся о добавлении названия книги,
и наш серверный код добавит сведения об авторе в фоновом режиме. Пользователь уже выбрал книгу.

```js
const options = [
    {
        title: 'HTML5',
        author: {
            firstName: 'Remy',
            lastName: 'Sharp',
        },
    },
]
```

```html
<v-select
        taggable
        multiple
        label="title"
        :options="options"
        :create-option="book => ({ title: book, author: { firstName: '', lastName: '' } })"
        :reduce="book => `${book.author.firstName} ${book.author.lastName}`"
/>
```

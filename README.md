# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage - ✅
- Search for a country using an `input` field - ✅
- Filter countries by region - ✅
- Click on a country to see more detailed information on a separate page - ✅
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode _(optional)_ - ✅

### Screenshot

![Countries App](./%F0%9F%97%BA%20Countries%20App.png)

### Links

- [Solution URL](https://github.com/Divyue30597/countries-api)
- [Live Site URL](https://divyue30597.github.io/countries-api/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- TypeScript

### What I learned

#### In react and JS

Input debouncing since on every time the component state updates in input a new request is sent to the server. In order to reduce the load on the server, a new `useDebounce` hook is introduced. Once the user types in the word then only the request is sent to the server.

```js
import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 1000) {
  const [debouncedValue, setDebouncedValue] = useState<string | null>();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeOut);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

#### In CSS and HTML

Lazy loading loads image and is displayed only when it is viewport.

```html
<img loading="lazy" src="" alt="" />
```

In CSS, learnt about 2 new media queries.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background-color: var(--background-color-dark);
    --heading: var(--heading-dark);
    --paragraph: var(--paragraph-dark);
    --anchor-color: var(--anchor-dark);
    --select: var(--select-dark);
    --navbar: var(--navbar-dark);
    --input: var(--input-dark);
  }
}
```

This takes in the user's system theme setting and according to that sets the page's theme.

```css
[color-scheme="dark"] {
  --background-color: var(--background-color-dark);
  --heading: var(--heading-dark);
  --paragraph: var(--paragraph-dark);
  --anchor-color: var(--anchor-dark);
  --select: var(--select-dark);
  --navbar: var(--navbar-dark);
  --input: var(--input-dark);

  [type="text"] {
    background-image: url(./assets/search-dark.svg);
  }

  .navbar ul li picture a img {
    filter: invert(100%);
  }
}
```

This helps in assigning the light or dark theme to the application's page through the navbar. Simple toggle function is used here. Setting the color-scheme to the root element and switching it.

```js
const root = document.querySelector(":root");
const [light, setLight] = useState(
  window.matchMedia("(prefers-color-scheme: light)").matches
);

function toggleTheme() {
  root?.setAttribute("color-scheme", `${light ? "dark" : "light"}`);
  setLight(!light);
}

useEffect(() => {
  if (light) {
    root?.setAttribute("color-scheme", "light");
  }
}, []);
```

### Continued development

- Need to focus more on responsive web design part of the application.

### Useful resources

- [Use Hooks](https://usehooks-ts.com/) - This is used for the debouncing part of the application.
- [YT playlist for inspiring the toggle button functionality](https://www.youtube.com/playlist?list=PL4cUxeGkcC9jXaLsxbEmsPSOlb40ZLaKN)

## Author

- Frontend Mentor - [Divyue30597](https://www.frontendmentor.io/profile/Divyue30597)
- Github - [Divyue30597](https://github.com/Divyue30597/countries-api)

# Node.js Dark Mode Listener

A small library for listening to dark mode changes on macOS Mojave.

## Installation

```sh
npm install --save dark-mode-listener
```

## Usage

```js
const DarkMode = require('dark-mode-listener')

DarkMode.on('change', (value) => {
  console.log(`We are now in ${value} mode`)
  //=> We are now in dark mode
})
```

The export of the module is an `EventEmitter` that will emit a `change` event whenever dark mode is toggled on or off, and initially when the module is loaded.

## API

### event: `change`

The `change` event is emitted whenever dark mode is toggled on or off, and initially when the module is loaded. The value is a single string that will read either `'light'` or `'dark'`.

### `.currentValue`

Holds the current value, either `'light'` or `'dark'`. This property will be `undefined` until the first `change` event have been emitted.

### `.stop()`

Stop listening for changes.

## Implementation

This package ships with a small binary, [dark-mode-listener](https://github.com/LinusU/DarkModeListener) for macOS and [dark-mode-listener-linux](https://github.com/rockon999/dark-mode-listener-linux) for Linux, to listen to the changes.

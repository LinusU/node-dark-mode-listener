const DarkMode = require('./')

// Test change event
DarkMode.on('change', (value) => console.log(`change emitted: ${value}`))

// Test currentValue property
setInterval(() => console.log(`current value: ${DarkMode.currentValue}`), 1000).unref()

// Test stop function
setTimeout(() => DarkMode.stop(), 10000)

# @chenziappu/resizer

Resizer is a simple JavaScript library for handling window resize events. It provides a convenient way to register callback functions that will be executed every time the window size changes, and it also allows you to control the frequency of the resize events by specifying a delay time.

<br>

## Install

```sh
npm install @chenziappu/resizer
```
```js
import Resizer from '@chenziappu/resizer';
```
or
```html
<script src="https://unpkg.com/@chenziappu/resizer"></script>
```

<br>

## Usage

To use Resizer, simply create a new instance of the Resizer class and register your callback functions using the add() method:

```js
const resizer = new Resizer();

resizer.add(({ width, height, dpr }) => {
  console.log(`Window size changed to ${width}x${height} at ${dpr}x DPR.`);
});
```

You can also specify a priority value when registering your callbacks, which will determine the order in which they are executed:

```js
resizer.add(({ width, height, dpr }) => {
  console.log('First callback');
}, 10);

resizer.add(({ width, height, dpr }) => {
  console.log('Second callback');
}, 5);

resizer.add(({ width, height, dpr }) => {
  console.log('Third callback');
}, 1);
```

You can remove a callback by calling the remove() method and passing the ID returned by the add() method:

```js
const id = resizer.add(({ width, height, dpr }) => {
  console.log('Callback');
});

resizer.remove(id);
```

<br>

## Option

|Option|Type|Default|Description|
|------|----|-------|-----------|
|`timeout`|Number|0|The delay time in milliseconds between resize events. If this value is zero or not specified, resize events will be fired immediately.|

<br>

## Methods

|Method|Description|
|------|-----------|
|`add(handler: function, priority: number = 0): number`|Register a new callback function with the specified priority value. Returns the ID of the new callback.|
|`remove(id: number)`|Remove the callback with the specified ID.|
|`get({ width: number, height: number, dpr: number })`|Get the current window size and device pixel ratio.|
|`dispose()`|Dispose of the Resizer instance and remove all event listeners.|

<br>

## License

[ISC License](http://opensource.org/licenses/ISC)
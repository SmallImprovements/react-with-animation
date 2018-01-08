# react-with-animation

A Component and a Higher-Order-Component (HOC) to manage short-lived CSS animations in React

Working example: [here](https://lucastobrazil.github.io/react-with-animation-example/) or take a quick squiz at the code example further down the readme.

## Concept
Let's say you want to temporarily add a CSS class to a React component to play a little animation, and when the animation's finished, remove the class. Sounds like a simple enough thing to do, right? We've been doing that for years in jQuery:
```
$('#myThing').addClass('animateMe').delay(3000).removeClass('animateMe');
```
In React, the `$('#myThing')`selector part is a bit different. Because React is declarative in nature, we need  a component that can handle imperatively telling React which component we want to add (and remove) the CSS classes to. That's what this `react-with-animation` does - it 'wraps' your component so that it always knows where it is in the React DOM, and can apply and remove the animation when it's done.
```JSX
import { WithAnimationContainer } from 'react-with-animation';

render() {
   return (
      <WithAnimationContainer animationClasses="animateMe" animationDuration={3000}>
         <MyComponent />
      </ WithAnimationContainer>
   );
}
```
There are plenty of ways to do this, but this project offers a simple, unified way to integrate such animations into your already-existing components, without needing to add change them or add all the boilerplate code each time.

## Installation
```
npm i react-with-animation --save
```
## Example
Check out a working example [here](https://lucastobrazil.github.io/react-with-animation-example/) or take a quick squiz at the code example below.

1. Set up your CSS Animation
```CSS
.animateMe {
   animation-name: slideAndFadeIn; 
}

@keyframes slideAndFadeIn {
   0% {
      transform: translateX(-10px);
      opacity: 0;
   }
   100% {
      transform: translateX(0);
      opacity: 1;
   }   
}
```

2. Then in React, 
```JSX
import { WithAnimationContainer } from 'react-with-animation';

render() {
   return (
      <WithAnimationContainer animationClasses="animateMe" animationDuration={3000}>
         <MyComponent />
      </WithAnimationContainer>
   );
}
```
3. On render, `<MyComponent />` will be wrapped with an element that has the CSS class `animateMe` for 3000ms, then once the animation is completed, the class will be removed!

### Alternative (HOC) usage
```JSX
import { withAnimation } from 'react-with-animation';

const MyComponent = ({ className, style }) => <div className={className} style={style}>Yay</div>;
const AnimateMyComponent = withAnimation(MyComponent);
render() {
   return <AnimateMyComponent animationClasses="animateMe" animationDuration={3000} animateOnFirstRender={true} />
}
```
3. On render, `<MyComponent />` will have the CSS class `animateMe` for 3000ms, then once the animation is completed, the class will be removed!

<img src="https://github.com/lucastobrazil/react-with-animation-example/blob/master/src/example-withAnimation.gif" />

## API / Props
Both `<WithAnimationContainer>` and the Component passed to the `withAnimation` HOC take the following props. These are considered to be the basic configuration

| Prop     	| Type          	| Optional? 	| Default 	|
|----------	|---------------	|-----------	|---------	|
| animationClasses 	| `string`  	| no     	| '' |
| animateOnFirstRender 	| `boolean`      	| yes       	| false |
| animationDuration 	| `number`(ms) 	| yes        	| 3000 |

When using the HOC, it is important to note that the *wrappee* (ie the component that will have the animation applied to it) *must* pass these props:

| Prop     	| What is applied          	|
|----------	|---------------	|
| className 	| `animationClasses` + any other classes you place on the component |
| style 	| `animationDuration` + any other styles you place on the component |

## Methods
When using the HOC, you can call `startAnimation()` and it will will 'play' the animation again.
You will need to set a `ref` and you can call `ref.startAnimation();`

```JSX
import { withAnimation } from 'react-with-animation';

const MyComponent = ({ className, style }) => <div className={className} style={style}>Yay</div>;
const AnimateMyComponent = withAnimation(MyComponent);

class Animated extends React.Component {
   start = () => {
      this.animatedComponentRef.startAnimation();
   };
   render() {
      return (
         <div>
            <AnimateMyComponent animationClasses="animateMe" ref={el => this.animatedComponentRef = el } />

            // Click the button and call the start() method of this class
            <Button onClick={this.start}>Play</Button>
         </div>
      );
   }
}
```
## Should I use the <WithAnimationContainer> or the HOC?
The choice is yours - however one caveat with your CSS animations relates to which CSS properties you animate. 
   
For example, if you want to animate the CSS properties which affect all of an element's children (like `transform`, `position` etc), use the `<WithAnimationContainer>`. Although the animation will be applied to our `WithAnimationContainer` wrapper element, luckily all the children will follow suit :)

If your animation needs to animate specific properties of the element (`background-color`, `border-color`) for instance, then you can use the HOC so that the animation is placed directly on the element which has the background, border etc. One example of this is if you have a "Card" style component whose border colour might flash if it's just been created. 


## Gotchas
1. You should *not* set `animation-duration` in CSS - this is handled via the `animationDuration` prop set in your wrapped component.

## License

Released under the [MIT license](https://opensource.org/licenses/MIT).

## Contribute

Please let me know if you have any feedback. Fork the repo, create Pull Requests and Issues. Have a look into [how to contribute](/CONTRIBUTE.md).

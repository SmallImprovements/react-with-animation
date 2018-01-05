# react-with-animation

A higher-order-component (HOC) to manage short-lived CSS animations in React
## Concept
Let's say you want to temporarily add a CSS class to a React component to play a little animation, and when the animation's finished, remove the class. Sounds like a simple enough thing to do, right? We've been doing that for years in jQuery:
```
$('#myThing').addClass('animateMe').delay(3000).removeClass('animateMe');
```
In React, the `$('#myThing')`selector part is a bit different. What we need is a component that can know about which component we want to add (and remove) the CSS classes to. That's what this HOC does - it 'wraps' your component so that it always knows where it is in the React DOM, and can apply and remove the animation when it's done.
```JSX
const AnimateMyComponent = withAnimation(MyComponent);
render() {
   return <AnimateMyComponent animationClasses="animateMe" animationDuration={3000} />
}
```
<img src="https://github.com/lucastobrazil/react-with-animation-example/blob/master/src/example-withAnimation.gif" />

There are plenty of ways to do this, but this HOC offers a simple, unified way to integrate such animations into your already-existing components, without needing to add change them or add all the boilerplate code each time.

## Installation
```
npm i react-with-animation --save
```
## Example
Check out a working example [here](https://github.com/lucastobrazil/react-with-animation-example) or take a quick squiz at the code example below.

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
const MyComponent = props => <div {...props}>Yay</div>;
const AnimateMyComponent = withAnimation(MyComponent);
render() {
   return <AnimateMyComponent animationClasses="animateMe" animationDuration={3000} animateOnFirstRender={true} />
}
```
3. On render, `<MyComponent />` will have the CSS class `animateMe` for 3000ms, then once the animation is completed, the class will be removed!

## Props
|Prop|Type |Default|
|---|---|---|
|animationClasses | `string` | ''   |
|animateOnFirstRender | `boolean` | false   |
|animationDuration | `number`(ms) | 3000   |

## Methods
`startAnimation()` Will 'play' the animation again.
You will need to set a `ref` and you can call `ref.startAnimation();`

```JSX
const MyComponent = props => <div {...props}>Yay</div>;
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

## Gotchas
1. The component to be 'wrapped' needs to pass props in... this is where the HOC will add the animation classes *onto* your component, instead of needing to add a wrapper element etc. Specifically, it needs to pass `className` and `style` props onto the component, but spreading all props is a cleaner way to let all the props pass through.

```JSX
const MyComponentToBeWrapped = props => <div {...props} />;
or
const MyWrappedComponent = withAnimation(props => <div {...props} />);
```

When you need to add your own props to your 'wrapped' component, do it like this:
```JSX
<MyComponentToBeWrapped foo={bar} className="boo" animationClasses="animated" animationDuration={3000} />
```

2. You should *not* set `animation-duration` in CSS - this is handled via the `animationDuration` prop set in your wrapped component.

3. You need to wrap the actual component/element that will have the css animation applied to it. If you want some `<Text />` inside a div to be animated, wrap the `<Text />` component in the HOC, not the parent.

## License

Released under the [MIT license](https://opensource.org/licenses/MIT) by Davy Duperron.

## Contribute

Please let me know if you have any feedback. Fork the repo, create Pull Requests and Issues. Have a look into [how to contribute](/CONTRIBUTE.md).

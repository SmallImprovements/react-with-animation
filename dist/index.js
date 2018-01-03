import PropTypes from 'prop-types';
import React, { Component } from 'react';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const propTypes = {
    animationClasses: PropTypes.string.isRequired,
    animationDuration: PropTypes.number,
    animateOnFirstRender: PropTypes.bool
};

const defaultProps = {
    animateOnFirstRender: false,
    animationDuration: 3000
};

function withAnimation(WrappedComponent) {
    class ComponentWithAnimation extends Component {
        constructor() {
            super();
            this.state = {
                isAnimating: false
            };
            this.timeoutFunc = null;
            this.startAnimation = this.startAnimation.bind(this);
        }

        componentWillUnmount() {
            clearTimeout(this.timeoutFunc);
        }

        componentWillMount() {
            if (this.props.animateOnFirstRender) {
                this.startAnimation();
            }
        }

        startAnimation() {
            if (this.state.isAnimating) {
                return;
            }
            const { animationDuration } = this.props;
            clearTimeout(this.timeoutFunc);

            this.setState({ isAnimating: true });

            this.timeoutFunc = setTimeout(() => {
                this.setState({ isAnimating: false });
            }, animationDuration);
        }

        render() {
            const { isAnimating } = this.state;
            const { animationClasses, animationDuration, children, wrappedRef, className, style } = this.props;
            const classes = `${className ? className : ''} ${isAnimating && animationClasses ? animationClasses : ''}`;
            const componentProps = _extends({}, this.props, {
                style: _extends({}, style, {
                    animationDuration: isAnimating ? `${animationDuration}ms` : null
                }),
                className: classes,
                ref: wrappedRef
            });
            return React.createElement(
                WrappedComponent,
                componentProps,
                children
            );
        }
    }

    ComponentWithAnimation.propTypes = propTypes;
    ComponentWithAnimation.defaultProps = defaultProps;
    return ComponentWithAnimation;
}

export default withAnimation;

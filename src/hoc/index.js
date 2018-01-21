import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const propTypes = {
    animationClasses: PropTypes.string.isRequired,
    animationDuration: PropTypes.number,
    animateOnFirstRender: PropTypes.bool,
};

const defaultProps = {
    animateOnFirstRender: false,
    animationDuration: 3000,
};

export default function withAnimation(WrappedComponent) {
    class ComponentWithAnimation extends Component {
        constructor() {
            super();
            this.state = {
                isAnimating: false,
            };
            this.timeoutFunc = null;
            this.startAnimation = this.startAnimation.bind(this);
            this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
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
        }

        handleAnimationEnd() {
            this.setState({ isAnimating: false });
        }

        render() {
            const { isAnimating } = this.state;
            const { animationClasses, animationDuration, children, wrappedRef, className, style } = this.props;
            const classes = []
                .concat(className ? [className] : [])
                .concat(isAnimating && animationClasses ? [animationClasses] : [])
                .join(' ');

            const componentProps = {
                ...this.props,
                style: {
                    ...style,
                    animationDuration: isAnimating ? `${animationDuration}ms` : null,
                },
                className: classes,
                ref: wrappedRef,
                onAnimationEnd: this.handleAnimationEnd,
            };
            return <WrappedComponent {...componentProps}>{children}</WrappedComponent>;
        }
    }

    ComponentWithAnimation.propTypes = propTypes;
    ComponentWithAnimation.defaultProps = defaultProps;
    return ComponentWithAnimation;
}

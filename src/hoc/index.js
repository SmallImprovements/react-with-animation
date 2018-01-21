import PropTypes from 'prop-types';
import React, { Component } from 'react';

export const propTypes = {
    animationClasses: PropTypes.string.isRequired,
    animateOnFirstRender: PropTypes.bool,
};

const defaultProps = {
    animateOnFirstRender: false,
};

export default function withAnimation(WrappedComponent) {
    class ComponentWithAnimation extends Component {
        constructor() {
            super();
            this.state = {
                isAnimating: false,
            };
            this.startAnimation = this.startAnimation.bind(this);
            this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
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
            this.setState({ isAnimating: true });
        }

        handleAnimationEnd() {
            this.setState({ isAnimating: false });
        }

        render() {
            const { isAnimating } = this.state;
            const { animationClasses, children, wrappedRef, className, style } = this.props;
            const classes = []
                .concat(className ? [className] : [])
                .concat(isAnimating && animationClasses ? [animationClasses] : [])
                .join(' ');

            const componentProps = {
                ...this.props,
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

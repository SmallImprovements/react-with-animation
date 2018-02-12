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
        constructor(props) {
            super(props);
            this.state = {
                isAnimating: false,
            };
            this.timeoutFunc = null;
            this.startAnimation = this.startAnimation.bind(this);
            this.computeStyle = this.computeStyle.bind(this);
            this.setAnimationState = this.setAnimationState.bind(this);
            this.shouldRecomputeStyle = this.shouldRecomputeStyle.bind(this);
            this.computeStyle(props.style, this.state.isAnimating, props.animationDuration);
        }

        componentWillUnmount() {
            clearTimeout(this.timeoutFunc);
        }

        componentWillMount() {
            if (this.props.animateOnFirstRender) {
                this.startAnimation();
            }
        }

        componentWillReceiveProps(nextProps) {
            const { style, animationDuration } = this.props;
            const { isAnimating } = this.state;
            if (this.shouldRecomputeStyle(this.props, nextProps)) {
                this.computeStyle(nextProps.style, isAnimating, nextProps.animationDuration);
            }
        }

        setAnimationState(isAnimating) {
            this.setState({ isAnimating: isAnimating });
            this.computeStyle(this.props.style, isAnimating, this.props.animationDuration);
        }

        startAnimation() {
            if (this.state.isAnimating) {
                return;
            }
            const { animationDuration } = this.props;
            clearTimeout(this.timeoutFunc);

            this.setAnimationState(true);

            this.timeoutFunc = setTimeout(() => {
                this.setAnimationState(false);
            }, animationDuration);
        }

        computeStyle(style, isAnimating, animationDuration) {
            this.style = {
                ...style,
                animationDuration: isAnimating ? `${animationDuration}ms` : null,
            };
        }

        shouldRecomputeStyle(currentProps, nextProps) {
            if (nextProps.animationDuration !== currentProps.animationDuration) {
                return true;
            }

            if (nextProps.style !== currentProps.style) {
                return true;
            }

            return false;
        }


        render() {
            const { isAnimating } = this.state;
            const { animationClasses, animationDuration, children, wrappedRef, className } = this.props;
            const classes = []
                .concat(className ? [className] : [])
                .concat(isAnimating && animationClasses ? [animationClasses] : [])
                .join(' ');

            const componentProps = {
                ...this.props,
                style: this.style,
                className: classes,
                ref: wrappedRef,
            };
            return <WrappedComponent {...componentProps}>{children}</WrappedComponent>;
        }
    }

    ComponentWithAnimation.propTypes = propTypes;
    ComponentWithAnimation.defaultProps = defaultProps;
    return ComponentWithAnimation;
}

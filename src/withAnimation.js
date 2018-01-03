import PropTypes from 'prop-types';
import { Component } from 'react';

const propTypes = {
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
            const componentProps = {
                ...this.props,
                style: {
                    ...style,
                    animationDuration: isAnimating ? `${animationDuration}ms` : null,
                },
                className: `${className} ${isAnimating ? animationClasses : ''}`,
                ref: wrappedRef,
            };
            return <WrappedComponent {...componentProps}>{children}</WrappedComponent>;
        }
    }

    ComponentWithAnimation.propTypes = propTypes;
    ComponentWithAnimation.defaultProps = defaultProps;
    return ComponentWithAnimation;
}

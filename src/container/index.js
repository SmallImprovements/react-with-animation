import PropTypes from 'prop-types';
import React from 'react';
import withAnimation, { propTypes } from '../hoc/index';

WithAnimationContainer.propTypes = propTypes;

/*
    In order to pass a react component to the hoc, we need to create a React element for the div
*/
const Div = ({ children, className, onAnimationEnd }) => (
    <div className={className} onAnimationEnd={onAnimationEnd}>
        {children}
    </div>
);

const Animatee = withAnimation(Div);

export default function WithAnimationContainer(props) {
    return <Animatee {...props} />;
}

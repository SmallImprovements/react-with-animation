import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default {
    input: 'src/withAnimation.js',
    external: ['react', 'prop-types'],
    output: [
        {
            file: pkg.main,
            format: 'cjs',
        },
        {
            file: pkg.module,
            format: 'es',
        },
    ],
    plugins: [
        babel({
            babelrc: false,
            exclude: ['node_modules/**'],
            presets: ['babel-preset-react'],
            plugins: ['transform-object-rest-spread'],
        }),
    ],
};

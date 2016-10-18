module.exports = (wallaby) => ({
    files: [{
        pattern: 'src/**/*.js*',
        load: false,
    }, {
        pattern: 'src/**/__tests__/*.js',
        ignore: true,
    }],
    tests: [
        'src/**/__tests__/*.js',
    ],
    env: {
        type: 'node',
    },
    testFramework: 'jest',
    compilers: {
        '**/*.js': wallaby.compilers.babel({
            presets: [
                'latests',
            ],
        }),
    },
});

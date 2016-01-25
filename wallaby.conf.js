module.exports = function(wallaby) {
    return {
        files: [
            'src/*.js*'
        ],
        tests: [
            'test/*.spec.js'
        ],
        env: {
            type: 'node'
        },
        testFramework: 'mocha',
        compilers: {
            '**/*': wallaby.compilers.babel({
                "presets": [
                    "es2015",
                    "stage-0"
                ]
            })
        }
    };
};

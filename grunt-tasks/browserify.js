module.exports = {
    options: {
        transform: ['6to5ify'],
        browserifyOptions: {
            debug: true
        }
    },
    spec: {
        files: {
            'test/build/specs.js': ['test/spec/**/*.js']
        }
    },
    dev: {
        files: {
            'dev/js/app.js': ['src/dev.js']
        }
    }
};

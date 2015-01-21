module.exports = {
    options: {
        modules: 'common'
    },
    build: {
        files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.js', '!dev.js'],
            dest: 'dist/',
        }],
    }
};

module.exports = {
    collectCoverage: true,
    testEnvironment: 'node',
    transform: {
        ".*\\.(vue)$": "vue-jest",
        '\\.(js|ts)$': [
            'babel-jest',
            {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    '@babel/preset-typescript'
                ],
                plugins: ['@babel/plugin-transform-runtime']
            }
        ]
    }
}
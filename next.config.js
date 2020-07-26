const withPWA = require('next-pwa')

module.exports = withPWA({
    pwa: {
        dest: 'public'
    },
    env: {
        PRI_KEY: process.env.PRI_KEY,
        PUB_KEY: process.env.PUB_KEY,
    },
})
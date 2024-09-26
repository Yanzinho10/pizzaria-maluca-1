var config = {
    dev: {
        url: 'http://localhost/',
        port: 3000,
        ambiente: 'DEV',
        database: {
            host: '127.0.0.1',
            port: 3308,
            user: 'root',
            password: '123456',
            database: 'pizzaria1'

        }


    }
}

exports.get = function get(ambiente) {

    if (ambiente.toLowerCase() === 'dev') {
        return config.dev
    }
}
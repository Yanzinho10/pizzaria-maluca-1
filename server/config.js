var config = {
    dev: {
        url: 'http://localhost/',
        port: 3000,
        ambiente: 'DEV',
        database: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '12345678',
            database: 'pizzaria1',
            timezone: 'utc'

        }


    }
}

exports.get = function get(ambiente) {

    if (ambiente.toLowerCase() === 'dev') {
        return config.dev
    }
}
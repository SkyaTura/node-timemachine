const mysqldump = require('mysqldump')
const mkdirp = require('mkdirp')
const destFormat = require('../DestFormat.js')

module.exports = function (options, env) {
    return new Promise((resolve, reject) => {
        let path = `${env.outputFolder}/${env.projectName}/`
        mkdirp(path, (err) => {
            err ? reject(err) : resolve(true)

            options.dest = destFormat('mysqldump', path, options.database)
            mysqldump(options, (err) => {
                err ? reject(err) : resolve(true)
            })
        })
    })
}
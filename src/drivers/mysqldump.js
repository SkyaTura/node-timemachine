const mysqldump = require('mysqldump')
const mkdirp = require('mkdirp')

module.exports = function (options, env) {
    return new Promise((resolve, reject) => {
        let path = `${env.outputFolder}/${env.projectName}/`
        mkdirp(path, (err) => {
            err ? reject(err) : resolve(true)

            options.dest = `${path}/backup_mysqldump_${options.database}_${Date.now()}.sql`
            mysqldump(options, (err) => {
                err ? reject(err) : resolve(true)
            })
        })
    })
}
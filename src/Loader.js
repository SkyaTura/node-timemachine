const fs = require('fs')
const YAML = require('yamljs')

const Loader = function (loadFrom) {
    return new Promise((resolve, reject) => {
        console.log(`Reading folder ${loadFrom}`)
        let projects = []

        fs.readdir(loadFrom, (err, files) => {
            if (err) {
                return reject(err)
            }
            console.log(`Found ${files.length} file${files.length !== 1 ? 's' : ''}`)
            files.map((file) => {
                if (!file.endsWith('.yaml')) {
                    return
                }
                let yaml = YAML.load(`${loadFrom}/${file}`)
                for (let name in yaml){
                    let options = yaml[name]
                    projects.push({
                        options,
                        name
                    })
                }
            })
            resolve(projects)
        })
    })
}

module.exports = Loader
const crontab = require('node-cron')

const Loader = require('./loader.js')
const mysqldump = require('./drivers/mysqldump.js')

class TimeMachine {
    constructor (options = {}) {
        this.drivers = {}
        this.tasks = []

        this.loadDriver('mysqldump', mysqldump)
        this.loadProjects(options.projectsFolder || './projects')
        this.outputFolder = options.outputFolderFolder || './storage'
    }
    loadProjects (dir) {
        Loader(dir || './projects')
            .then((projects) => {
                projects.map((project) => {
                    console.log(`Loading ${project.name}`)
                    this.loadProject(project)
                })
            })
    }
    loadProject (project) {
        console.log(`Loading ${project.name}`)
        this.tasks.push(crontab.schedule(
            project.options.cron || '* * * * * *',
            () => {
                console.log(`Running ${project.name}:`)
                for (let driver in project.options.drivers) {
                    console.log(`\tDumping with ${driver}`)
                    this.runDriver(driver, project.options.drivers[driver], project.name)
                }
            }
        ))
    }
    loadDriver (name, driver) {
        return this.drivers[name] = driver
    }
    runDriver (name, connections, projectName) {
        let driver = this.drivers[name]
        if (!driver) {
            return false
        }
        connections.map((parameters) => {
            driver(parameters, {
                projectName,
                outputFolder: this.outputFolder
            })
        })
    }
}

module.exports = TimeMachine
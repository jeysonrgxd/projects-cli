const chalk = require('chalk')
const signale = require('signale')
const path = require('path')
const axios = require('axios')
const shell = require('shelljs')
const os = require('os')
const fs = require('fs')
const { config } = require('./configReader')

const create = async (name, owner = config.defaultOwner, org = false, private = true) => {
  if (!name) {
    signale.error(chalk.red("Project name not specified"))
    process.exit()
  }

  signale.info(`Now creating ${config.projectsDir}/${name} directory`)

  const homeDir = os.homedir()
  const dir = path.join(homeDir, config.projectsDir, name)

  // Make the directorry
  try {
    fs.mkdirSync(dir)
  } catch (error) {
    if (error.code == 'EEXIST') {
      signale.error(chalk.red(`Project directory ${name} already exists`))
    } else signale.error(chalk.red('Something went wrong...'))
    process.exit()
  }

  signale.info(`Now creating ${name} GitHub repository...`)

  let url;

  // create the git repository
  try {
    const baseUrl = 'https://api.github.com/'
    const repoUrl = org ? `orgs/${owner}/repos` : 'user/repos'

    const { data: repo } = await axios.post(`${baseUrl}${repoUrl}`, {
      name,
      private
    }, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      },
      auth: {
        username: config.github.username,
        password: config.github.token
      }
    })

    url = repo.html_url
  } catch (error) {
    signale.error(chalk.red('Something went wrong - are you sure this repository doesn\'t exist?'))
    process.exit()
  }

  // Create the README and initialise git

  signale.info("Now generating README")
  try {
    fs.writeFileSync(`${dir}/README.md`, `# ${name}`)
  } catch (error) {
    signale.error('Something went wrong creating the readme.')
    // carry on as this doesn't really matter
  }

  signale.info("Initialising local git repository...")
  try {
    shell.cd(`${dir}`)
    shell.exec(`git init`)
    shell.exec(`git remote add origin ${url}.git`)
  } catch (error) {
    signale.error('Something went wrong initialising the repository locally.')
    process.exit()
  }

  signale.info("Committing repo...")
  try {
    shell.exec('git add .')
    shell.exec('git commit -m "initial commit"')
    shell.exec('git push --set-upstream origin master')
  } catch (error) {
    signale.error('Something went wrong creating the initial commit.')
  }

  signale.info('Opening VSCode')
  shell.exec('code .')

  signale.success(`Successfully create project ${name}`)
}

module.exports = {
  create
}
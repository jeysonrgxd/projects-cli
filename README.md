# Projects CLI

This is a small cli to create a new project. It performs the following steps:

- Creates a new directory
- Adds a README file
- Initialises an empty git repo locally
- Create a GitHub repository
- Adds the remote origin path
- Commits and pushes the README file
- Opens VSCode

## Installation

First, clone the project
`git clone https://github.com/joelrozen/projects-cli`

Rename `config.sample.json` to `config.json` and fill in the details. **Note** the projectsDir setting is a _relative_ path to your home directory.

Install globally
`npm i -g .`

Use
`projects create -n my-new-project`

## Repository visibility

Repositories are created `private` by default. To make a public repository, add `-p` flag.

## Repository Owner

Repositories are created under "user" accounts by default. If you want to create the repository under a user other than your own/default, use the `-r <username>` flag.
If the user is an _organisation_ you **must** also pass the `-o` flag

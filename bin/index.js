#!/usr/bin/env node

const chalk = require('chalk')
const Minimist = require('minimist');
const { SignaleOptions } = require('signale');
const signale = require('signale');

const {create} = require('./create')

const argv = Minimist( process.argv.slice( 2 ));
const mainCommand = argv._[0];

const validCommands = ["create"]

if (!validCommands.includes(mainCommand)) {
  signale.error('Invalid command.')
  signale.log('projects create -n <project-name> -r <repo-owner> [-op]')
  signale.log('-o flag specifies that the repository owner is an organisation, not a user')
  signale.log('-p specifies to make a public repository (omitting is private by default)')
  process.exit();
}


switch (mainCommand) {
  case 'create':
    create(argv.n, argv.r, argv.o, argv.p)
    break
}

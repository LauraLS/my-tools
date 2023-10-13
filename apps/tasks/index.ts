#!/usr/bin/env node

import prompts from 'prompts'
import { green, red } from 'picocolors'
import createTask from './src/create-task'
import createPullRequest from './src/create-pull-request'

const handleSigTerm = () => process.exit(0)

process.on('SIGINT', handleSigTerm)
process.on('SIGTERM', handleSigTerm)

const ensureEnvs = async () => {
  if (!process.env.JIRA_DOMAIN || !process.env.JIRA_AUTHORIZATION) {
    return Promise.reject('The envs JIRA_DOMAIN or JIRA_AUTHORIZATION not exist. More info in doc')
  }
}

const run = async (): Promise<void> => {
  await ensureEnvs()

  const { task } = await prompts({
    type: 'select',
    name: 'task',
    message: 'What do you want to do?',
    choices: [
      { title: 'Create branch', description: '', value: 'Create branch' },
      { title: 'Create PR', description: '', value: 'Create PR' }
    ],
    initial: 0
  })

  if (task === 'Create branch') await createTask()
  if (task === 'Create PR') await createPullRequest()
}

run()
  .then(() => {
    console.log(`🐷  ${green('success')} process completed`)

    process.exit()
  })
  .catch((reason) => {
    console.log(`🐷  ${red('error')} aborting`)
    console.log(`🐷  ${red('error')} ${reason}`)

    process.exit(1)
  })

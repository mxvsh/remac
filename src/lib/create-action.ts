import colors from 'colors'
import ConfigStore from 'configstore'

const config = new ConfigStore('remac')

export const create_action = (
  file: string,
  label: string,
  description?: string
) => {
  console.log(colors.bold.blue(`[info] creating action ${label}`))
  const actions = config.get('actions') || []

  actions.push({
    label,
    file,
    description,
  })

  console.log('actions', actions)
  config.set('actions', actions)
  console.log(colors.bold.green(`[info] created action ${label}`))
}

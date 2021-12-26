import ConfigStore from 'configstore'
import { CreateAction } from '../types'

const config = new ConfigStore('remac')

console.log(config.all())

export const create_action = ({
  label,
  description,
  file_path,
}: CreateAction) => {}

export interface Action {
  file: string // path to the execcutable file
  label: string
  cwd: string
  description?: string
}

type ContentText = {
  type: 'text'
  content: string
}

type Content = ContentText | { type: 'list'; content: Content[] }

export type Task = {
  id: string
  title: string
  points: number
  dev?: string
  epic?: string
  project?: string
  type?: string
  content: string[]
}

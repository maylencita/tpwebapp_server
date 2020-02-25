export interface User {
  name: string
  avatar?: string
  points: number
  status: 'Connected' | 'Offline' | 'Suspended'
}

export type UserId = string

export type ChannelId = string

export type QuestionId = string

export interface Question {
  id: string
  user: User
  note: number
  content: string
  answers: Array<Answer>
}

export interface Answer { 
  id: string
  user: User
  note: number
  content: string
}

export interface Channel {
  name: string
  owner: UserId
  participants_ids : Array<UserId>
  questions: Array<Question>
}

export interface ServerState {
  users : Array<User>
  channels : Array<Channel>
  user?: User
}
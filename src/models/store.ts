import * as uuid from 'uuid'

import { ServerState, User, Channel, Question, Answer } from '../models'
import generateQuestions from '../utils/questionGenerator'

function firstChannel(user: User): Array<Channel> {
  return [
    {name: "general", owner: "Admin", participants_ids: ['Admin'], questions: [] as Array<Question>}
  ] as Array<Channel>
}

class Store {
  private admin: User = {
    name: 'Admin',
    points: 5,
    avatar: '--',
    status: 'Connected'
  }

  private state: ServerState = {
    users: [this.admin],
    channels: firstChannel(this.admin),
    user: this.admin
  }

  addUser(newUser: User){
    let user: User = {...newUser, points: 0, status: 'Connected'}

    this.state = {
      ...this.state,
      users: [...this.state.users, user]
    }

    return true
  }

  login(payload: {name: string, avatar: string}){
    let user = this.state.users.find(user => user.name === payload.name)

    if(user){
      this.state = {
        ...this.state,
        user
      }
      return this.state
    } else return null;
  }

  addChannel(channel: Channel){
    this.state = {
      ...this.state,
      channels: [...this.state.channels, channel] 
    }
    return true
  }

  updateChannels(payloadChannels: Array<Channel>){
    let newChannels = this.state.channels.length > payloadChannels.length ? this.state.channels : payloadChannels
    this.state = {
      ...this.state,
      channels: newChannels
    }
    return true
  }

  intersect<T>(a: Array<T>, b: Array<T>, compare: (t1:T, t2:T) => boolean): Array<T> {
    let bigger = a.length > b.length ? a : b
    return bigger.filter(e => b.findIndex(_b => compare(_b, e)) > -1)
  }

  diff<T>(a: Array<T>, b: Array<T>, compare: (t1:T, t2:T) => boolean): Array<T> {
    let bigger = a.length > b.length ? a : b
    return bigger.filter(e => b.findIndex(_b => compare(_b, e)) < 0)
  }

  addQuestion = (channelId: string, question: Question) => {
    let newChannels = this.state.channels.map( channel => {
      if(channel.name === channelId && channel.questions)
        channel.questions.push(question)
      
      return channel        
    })
    this.state = {
      ...this.state,
      channels: newChannels
    }

    return true
  }

  addAnswer = (channelId: string, questionId: string, answer: Answer) => {
    const addAnswer = (question: Question) => ({...question, answers: [...question.answers, {...answer, id: uuid.v4()} ]})
    const updateChannelQuestion = (channel: Channel) => ({
      ...channel, questions: channel.questions.map(q => q.id === questionId ? addAnswer(q) : q)
    })

    this.state = {
      ...this.state,
      channels: this.state.channels.map(c => c.name === channelId ? updateChannelQuestion(c): c)
    }

    return true
  }

  noteQuestion = (channelId: string, questionId: string, note: number) => {

    const updateChannelQuestion = (channel: Channel) => ({
      ...channel, questions: channel.questions.map(question => question.id === questionId ? {...question, note} : question)
    })

    this.state = {
      ...this.state,
      channels: this.state.channels.map(c => c.name === channelId ? updateChannelQuestion(c): c)
    }

    return true
  }

  noteAnswer = (channelId: string, questionId: string, answerId: string, note: number) => {
    const updateQuestionAnswer = (question: Question) => ({
      ...question, answers: question.answers.map(answer => answer.id === answerId ? {...answer, note} : answer)
    })
    const updateChannelQuestion = (channel: Channel) => ({
      ...channel, questions: channel.questions.map(question => question.id === questionId ? updateQuestionAnswer(question) : question)
    })

    this.state = {
      ...this.state,
      channels: this.state.channels.map(c => c.name === channelId ? updateChannelQuestion(c): c)
    }

    return true
  }

  users(){
    return this.state.users
  }

  channels() {
    return this.state.channels
  }

  questions() {
    return [] as Array<Question>
  }

  answers() {
    return [] as Array<Answer>
  }

  toJSON() {
    return this.state
  }
}

const store = new Store()

export default store
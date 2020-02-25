import { Response, Request } from "express";
import { User, Answer } from '../models'
import Store from '../models/store'
import * as uuid from 'uuid'

export function getState(request: Request, response: Response){
  response.send(Store.toJSON())
}

export function ping(request: Request, response: Response){
  response.send({ ping: 'ok'})
}

export function addUser(request: Request, response: Response) {
  let result = Store.addUser(request.body)
  if(result) {
    console.error('[!] Sending', Store.users())
    response.send(Store.users())
  } else
    response.status(500).send({error: "Could not register user"})
}

export function registerUser(request: Request, response: Response) {
  let state = Store.login(request.body)
  if (state)
    response.send(state)
  else
    response.status(401).send({error: "User not found!"})
}

export function getUsers(request: Request, response: Response) {
  response.send(Store.users())
}

export function getChannels(request: Request, response: Response) {
  response.send(Store.channels())
}

export function addChannel(request: Request, response: Response) {
  if (Store.addChannel(request.body)) {
    response.send(Store.channels())
  } else {
    response.status(400)
    response.send({error: 'An error occured'})
  }
}

export function updateChannels(request: Request, response: Response) {
  if(Store.updateChannels(request.body)) {
    response.send(Store.channels())
  } else {
    response.status(500).send({error: 'Could not save channels'})
  }
}

export function readChannel(request: Request, response: Response) {
  const channelId = request.params.channelId
  if(!!channelId){
    const questionsWithAnswers = 'TODO'
    response.send(questionsWithAnswers)
  } else response.send([])
}

export function addQuestion(request: Request, response: Response) {
  let channelId = request.params.channelId
  if(Store.addQuestion(channelId, request.body)){
    response.send(Store.channels())
  } else {
    response.status(500).send({error: 'Could not save question'})
  }
}

export function addAnswer(request: Request, response: Response) {
  let {channelId, questionId} = request.params
  if(Store.addAnswer(channelId, questionId, request.body)){
    response.send(Store.channels())
  } else {
    response.status(500).send({error: 'Could not update question'})
  }
}

export function noteQuestion(request: Request, response: Response) {
  let {channelId, questionId} = request.params
  let { note } = request.body
  if(Store.noteQuestion(channelId, questionId, note)){
    response.send(Store.channels())
  } else {
    response.status(500).send({error: 'Could not update question'})
  }
}

export function noteAnswer(request: Request, response: Response) {
  let {channelId, questionId, answerId} = request.params
  let { note } = request.body
  if(Store.noteAnswer(channelId, questionId, answerId, note)){
    response.send(Store.channels())
  } else {
    response.status(500).send({error: 'Could not update question'})
  }
}

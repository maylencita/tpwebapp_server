import * as express from 'express'
import { index } from './templates'
import * as Api from './controllers/ApiController'

const router = express.Router()

router.get('/', (request, response) => response.send("This is an API"))

router.get('/ping', Api.ping)

router.post('/login', Api.registerUser)

router.get('/users', Api.getUsers)

router.post('/user', Api.addUser)

router.get('/channels', Api.getChannels)

router.post('/channel', Api.addChannel)

router.put('/channels', Api.updateChannels)

router.post('/channels/:channelId/questions', Api.addQuestion)

router.post('/channels/:channelId/questions/:questionId', Api.addAnswer)

router.put('/channels/:channelId/questions/:questionId/note', Api.noteQuestion)

router.put('/channels/:channelId/questions/:questionId/answers/:answerId/note', Api.noteAnswer)

export default router
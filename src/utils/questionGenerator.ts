import * as loremIpsum from 'lorem-ipsum'
import * as uuid from 'uuid'
import { Question, User, Answer } from '../models'

const generateQuestions = (user: User, total: number) => {
  return Array(total).fill(1).map((_, index) => {
    const text = loremIpsum({count: 30, units: 'words'})
    return {
      id: uuid.v4(),
      user: user,
      content: text,
      answers: [] as Answer[],
      note: 0
    } as Question
  })
}

export default generateQuestions
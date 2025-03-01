import { AnswerQuestionUseCase } from './answer-question'

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase({
    create: async () => {},
  })

  const answer = await answerQuestion.execute({
    instructorId: '1',
    questionId: '2',
    content: 'Nova resposta',
  })

  expect(answer.content).toEqual('Nova resposta')
})

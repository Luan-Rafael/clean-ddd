import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const answer = makeAnswer({
      questionId: new UniqueEntityId('question-1'),
    })

    inMemoryAnswersRepository.create(answer)

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(1)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      const answer = makeAnswer({
        questionId: new UniqueEntityId('question-1'),
      })
      inMemoryAnswersRepository.create(answer)
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(2)
  })
})

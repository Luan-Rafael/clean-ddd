import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../../test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create a question', () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswersRepository.create(answer)

    sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    inMemoryAnswersRepository.delete(answer)

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to create a question', () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    inMemoryAnswersRepository.create(answer)

    sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    inMemoryAnswersRepository.delete(answer)

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })
})

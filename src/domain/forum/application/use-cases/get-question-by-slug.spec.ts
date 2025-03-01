import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuenstionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '../../../../../test/factories/make-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuenstionBySlugUseCase

describe('Find Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuenstionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
  })
})

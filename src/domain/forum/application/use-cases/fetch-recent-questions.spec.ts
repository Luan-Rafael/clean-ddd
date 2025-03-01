import { makeQuestion } from '../../../../../test/factories/make-questions'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'

import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recent questions', async () => {
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 20) }),
    )
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) }),
    )
    inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 25) }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 25),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 20),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 18),
      }),
    ])
  })

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i <= 22; i++) {
      inMemoryQuestionsRepository.create(
        makeQuestion({ createdAt: new Date(2025, 0, 25) }),
      )
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(3)
  })
})

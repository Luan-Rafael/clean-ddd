import { makeQuestionComment } from '../../../../../test/factories/make-question-comment'
import { makeQuestion } from '../../../../../test/factories/make-questions'
import { InMemoryQuestionCommentsRepository } from '../../../../../test/repositories/in-memory-question-comments'
import { InMemoryQuestionsRepository } from '../../../../../test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()
    inMemoryQuestionsRepository.create(question)

    await sut.execute({
      authorId: question.authorId.toString(),
      questionId: question.id.toString(),
      content: 'Contet Question Comment',
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
  })

  it('should not be able to comment on not found question', async () => {
    const questionComment = makeQuestionComment()

    await expect(() =>
      sut.execute({
        authorId: questionComment.authorId.toString(),
        questionId: questionComment.questionId.toString(),
        content: 'Contet Question Comment',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})

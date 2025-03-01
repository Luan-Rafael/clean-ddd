import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

interface AnswerQuestionUseCaseReponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute(
    answerRequest: AnswerQuestionUseCaseRequest,
  ): Promise<AnswerQuestionUseCaseReponse> {
    const answer = Answer.create({
      content: answerRequest.content,
      authorId: new UniqueEntityId(answerRequest.instructorId),
      questionId: new UniqueEntityId(answerRequest.questionId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}

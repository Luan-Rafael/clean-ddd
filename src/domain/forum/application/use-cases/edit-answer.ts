import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepostory: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepostory.findById(answerId)

    if (!answer) {
      throw new Error('Not Found.')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('Not Found.')
    }

    answer.content = content

    await this.answerRepostory.save(answer)

    return { answer }
  }
}

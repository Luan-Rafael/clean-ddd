import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(
    question: CreateQuestionUseCaseRequest,
  ): Promise<CreateQuestionUseResponse> {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(question.authorId),
      title: question.title,
      content: question.content,
    })

    await this.questionsRepository.create(newQuestion)

    return { question: newQuestion }
  }
}

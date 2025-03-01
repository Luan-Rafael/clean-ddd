import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuenstionBySlugRequest {
  slug: string
}

interface GetQuenstionBySlugResponse {
  question: Question
}

export class GetQuenstionBySlugUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: GetQuenstionBySlugRequest): Promise<GetQuenstionBySlugResponse> {
    const question = await this.questionRepository.findBySlug(
      Slug.createFromText(slug),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    return { question }
  }
}

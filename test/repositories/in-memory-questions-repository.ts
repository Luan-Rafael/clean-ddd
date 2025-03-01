import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  async findBySlug(slug: Slug): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug.value)

    return question ?? null
  }

  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }
}

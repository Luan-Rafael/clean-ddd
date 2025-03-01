import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id)

    return question ?? null
  }

  async findBySlug(slug: Slug): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug.value)

    return question ?? null
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async delete(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)

    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }
}

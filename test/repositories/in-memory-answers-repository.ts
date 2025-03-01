import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(answerId: string) {
    const answer = this.items.find((e) => e.id.toString() === answerId)
    return answer ?? null
  }

  async delete(answer: Answer): Promise<void> {
    const findIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(findIndex, 1)
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }
}

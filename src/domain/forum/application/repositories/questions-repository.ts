import { Question } from '@/domain/forum/enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { PaginationParams } from '@/core/repositories/pagination-params'

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>
  findBySlug(slug: Slug): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[] | []>
  create(question: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}

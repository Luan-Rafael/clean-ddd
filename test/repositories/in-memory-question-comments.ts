import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionCommentProps[] = []

  async create(comment: QuestionComment) {
    this.items.push(comment)
  }
}

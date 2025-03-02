import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface AnswerCommentProps {
  answerId: UniqueEntityId
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  get answerId() {
    return this.props.answerId
  }

  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(props: Optional<AnswerCommentProps, 'createdAt'>) {
    const answerComment = new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    })

    return answerComment
  }
}

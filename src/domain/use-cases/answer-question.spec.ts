
import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answers-repository'
import { Answer } from '../entities/answer'
import { Slug } from '../entities/value-objects/slug'
import { UniqueEntityId } from '../../core/entities/unique-entity-id'

const fakeAnswersRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(
        fakeAnswersRepository
    )

    const answer = await answerQuestion.execute({
        instructorId: new UniqueEntityId("1"),
        questionId: new UniqueEntityId("2"),
        content: "Nova resposta",
    })

    expect(answer.content).toEqual("Nova resposta")
})
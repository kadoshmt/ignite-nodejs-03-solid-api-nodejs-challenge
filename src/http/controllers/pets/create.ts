import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use.case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    breed: z.string().min(2),
    description: z.string(),
    color: z.string().min(2),
    age: z.number().default(0),
    size: z.string(),
    genre: z.enum(['MALE', 'FEMALE']),
    species: z.enum(['DOG', 'CAT', 'BIRD', 'RODENT', 'REPTILE']),
  })

  const { name, breed, description, color, age, size, genre, species } =
    createPetBodySchema.parse(request.body)

  const createPetUseCase = makeCreatePetUseCase()

  await createPetUseCase.execute({
    orgId: request.user.sub,
    name,
    breed,
    description,
    color,
    age,
    size,
    genre,
    species,
  })

  return reply.status(201).send()
}

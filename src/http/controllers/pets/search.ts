import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetsQuerySchema = z.object({
    city: z.string().min(2),
    color: z.string().optional(),
    species: z
      .enum(['DOG', 'CAT', 'BIRD', 'RODENT', 'REPTILE', 'ALL'])
      .default('ALL'),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, color, species, page } = searchPetsQuerySchema.parse(
    request.query,
  )

  const searchPetsUseCase = makeSearchPetsUseCase()

  const { pets } = await searchPetsUseCase.execute({
    params: { city, color, species },
    page,
  })

  return reply.status(200).send({
    pets,
  })
}

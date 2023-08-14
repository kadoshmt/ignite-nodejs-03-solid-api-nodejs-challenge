import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-org-role'
import { details } from './details'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', details)
  app.get('/pets/search', search)
  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, create)
}

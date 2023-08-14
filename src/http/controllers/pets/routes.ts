import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-org-role'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:petId', details)
  /** Authenticated */
  app.post('/pets', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, create)
}

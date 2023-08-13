import { UsersRepository } from '@/repositories/users-repository'
import { User, Prisma, Role } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const uuid = randomUUID()
    const user = {
      id: uuid,
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: Role.ORG,
      created_at: new Date(),
    }

    this.items.push(user)

    return user
  }
}
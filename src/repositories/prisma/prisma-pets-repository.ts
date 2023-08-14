import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { SearchManyParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async searchMany(params: SearchManyParams, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          city: {
            contains: params.city,
          },
        },
        color: params.color,
        species: params.species !== 'ALL' ? params.species : undefined,
        addopted_at: null,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}

import { Pet, Prisma } from '@prisma/client'

export interface SearchManyParams {
  city: string
  color?: string
  species?: 'DOG' | 'CAT' | 'BIRD' | 'RODENT' | 'REPTILE'
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(params: SearchManyParams, page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}

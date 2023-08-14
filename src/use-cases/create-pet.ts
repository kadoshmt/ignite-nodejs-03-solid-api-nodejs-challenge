import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  breed: string
  description: string | null
  color: string
  age?: number
  size: string | null
  genre: 'MALE' | 'FEMALE'
  species: 'DOG' | 'CAT' | 'BIRD' | 'RODENT' | 'REPTILE'
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    breed,
    description,
    color,
    age,
    size,
    genre,
    species,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      breed,
      description,
      color,
      age,
      size,
      genre,
      species,
      org_id: orgId,
    })

    return {
      pet,
    }
  }
}

import {
  PetsRepository,
  SearchManyParams,
} from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
  params: SearchManyParams
  page: number
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    params,
    page,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(params, page)

    return {
      pets,
    }
  }
}

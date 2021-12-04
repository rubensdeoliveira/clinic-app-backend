import { CompareHash, CompareHashDTO } from '@/data/authentication/protocols'

export class CompareHashSpy implements CompareHash {
  params: CompareHashDTO
  result: boolean = true

  async compare (params: CompareHashDTO): Promise<boolean> {
    this.params = params
    return this.result
  }
}
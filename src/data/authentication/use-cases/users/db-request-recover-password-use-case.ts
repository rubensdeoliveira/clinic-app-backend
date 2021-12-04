import { RequestRecoverPasswordUseCase, Set2FactorSecretInUserAccountUseCase } from '@/domain/authentication'
import { GetUserByEmailRepository } from '@/data/authentication/repositories'
import { InvalidCredentialsError } from '@/data/authentication/errors'
import { Create2FactorToken } from '@/data/auth/protocols'
import { ContactModel, HtmlTemplateParse, SendMail } from '@/data/common/protocols'

export class DbRequestRecoverPasswordUseCase implements RequestRecoverPasswordUseCase {
  constructor (
    private readonly getUserAccountByEmailRepository: GetUserByEmailRepository,
    private readonly set2FactorSecretInUserAccountUseCase: Set2FactorSecretInUserAccountUseCase,
    private readonly create2FactorToken: Create2FactorToken,
    private readonly requestRecoverPasswordEmailFilePath: string,
    private readonly htmlTemplateParse: HtmlTemplateParse,
    private readonly senderMail: ContactModel,
    private readonly sendMail: SendMail
  ) {}

  async request (email: string): Promise<void> {
    const accountByEmail = await this.getUserAccountByEmailRepository.getByEmail(email)
    if (!accountByEmail) {
      throw new InvalidCredentialsError()
    }
    const updatedAccount = await this.set2FactorSecretInUserAccountUseCase.setSecret(accountByEmail)
    const token = this.create2FactorToken.createToken(updatedAccount.secret_2factor)
    const contentMail = await this.htmlTemplateParse.parse({
      filePath: this.requestRecoverPasswordEmailFilePath,
      variables: {
        token,
        name: updatedAccount.name,
        email: updatedAccount.email
      }
    })
    this.sendMail.sendMail({
      sender: this.senderMail,
      content: contentMail,
      subject: 'Request Recover Password',
      to: {
        name: updatedAccount.name,
        email: updatedAccount.email
      }
    })
  }
}

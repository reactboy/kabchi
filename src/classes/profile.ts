export class Profile {
  uid: string
  mail: string | null
  updatedAt: string
  createdAt: string

  constructor() {
    this.uid = ''
    this.mail = null
    this.updatedAt = ''
    this.createdAt = ''
  }
}

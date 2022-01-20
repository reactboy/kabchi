type TaggingData = {
  id: string
  content: string
  createdAt: string
}
export class Tagging {
  id: string
  uid: string
  wallId: string
  content: string
  createdAt: string
  updatedAt: string

  constructor(data: TaggingData) {
    this.id = data.id
    this.uid = ''
    this.wallId = ''
    this.content = data.content
    this.createdAt = data.createdAt
    this.updatedAt = ''
  }

  getFormInput = () => {
    return {
      id: this.id,
      content: this.content,
    }
  }
}

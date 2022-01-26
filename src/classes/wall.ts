type WallData = {
  id: string
  title: string
  description: string
}

export class Wall {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  deleted: boolean

  constructor(data: WallData) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.createdAt = ''
    this.deleted = false
  }

  getFormInput = () => {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
    }
  }
}

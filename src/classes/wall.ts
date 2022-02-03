import { isSameDate, getDateText } from 'utils/date'

type WallData = {
  id: string
  title: string
  description: string
  created_at: string
  updated_at: string
}

export class Wall {
  id: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  deleted: boolean

  constructor(data: WallData) {
    this.id = data.id || ''
    this.title = data.title || ''
    this.description = data.description || ''
    this.createdAt = data.created_at || ''
    this.updatedAt = data.updated_at || ''
    this.deleted = false
  }

  isEdited = () => {
    return !isSameDate([this.createdAt, this.updatedAt])
  }

  getCreatedAt = (format: Parameters<typeof getDateText>[0]['format']) => {
    return getDateText({ date: new Date(this.createdAt), format })
  }

  getUpdatedAt = (format: Parameters<typeof getDateText>[0]['format']) => {
    return getDateText({ date: new Date(this.updatedAt), format })
  }

  getFormInput = () => {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
    }
  }
}

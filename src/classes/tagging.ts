import { getDateText, isSameDate } from 'utils/date'

type TaggingData = {
  id: string
  content: string
  updated_at: string
  created_at: string
  wall_id: string
  uid: string
}
export class Tagging {
  id: string
  uid: string
  wallId: string
  content: string
  createdAt: string
  updatedAt: string

  constructor(data: TaggingData) {
    this.id = data.id || ''
    this.uid = data.uid || ''
    this.wallId = data.wall_id || ''
    this.content = data.content || ''
    this.createdAt = data.created_at || ''
    this.updatedAt = data.updated_at || ''
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
      content: this.content,
    }
  }
}

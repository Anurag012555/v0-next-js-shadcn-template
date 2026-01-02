import { Types, Document } from 'mongoose'
import { LocalizedString } from './SharedSchemas'

export interface IBrand extends Document {
  _id: Types.ObjectId
  name: string
  slug: string
  logo?: string
  website?: string
  description?: LocalizedString
  isActive?: boolean
}


import { Types, Document } from 'mongoose'
import { LocalizedString } from './SharedSchemas'

export interface IDiscount extends Document {
  _id: Types.ObjectId
  code?: string // Uppercase, unique, sparse - Empty code = Automatic Discount
  name: string // "Summer Sale"
  description?: LocalizedString

  type: 'percentage' | 'fixed_amount' | 'free_shipping'
  value: number // 15% or $15

  // Limitations
  minPurchaseAmount?: number
  maxUsageLimit?: number // Global limit
  maxUsagePerUser?: number

  // Applicability
  appliesTo?: {
    type?: 'all' | 'category' | 'product' | 'shipping'
    ids?: Types.ObjectId[] // CategoryIDs or ProductIDs
  }

  startDate: Date
  endDate?: Date
  isActive?: boolean

  createdAt: Date
  updatedAt: Date
}

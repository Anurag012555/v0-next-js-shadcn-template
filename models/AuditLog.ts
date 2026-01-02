import { Types, Document } from 'mongoose'

export interface IAuditLog extends Document {
  _id: Types.ObjectId
  user?: Types.ObjectId // Reference to User
  action: string // "UPDATE_PRODUCT", "DELETE_ORDER"
  resource: string // "Product", "Order"
  resourceId?: Types.ObjectId
  ipAddress?: string
  userAgent?: string
  changes?: Map<string, any> // Before/After Diff
  timestamp: Date // Auto-delete after 1 year
}


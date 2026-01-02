import { Types, Document } from 'mongoose'
import { Address } from './SharedSchemas'

export interface IUser extends Document {
  _id: Types.ObjectId
  email: string
  password?: string
  firstName?: string
  lastName?: string
  avatar?: string

  // ✅ Roles: 'Admin' means they manage the platform AND the default Brand
  roles: Array<'customer' | 'super_admin' | 'admin' | 'editor' | 'support'>

  // For 'customer' role
  addresses: Address[]
  wishlist: Types.ObjectId[] // References to Product

  // Preferences
  preferences: {
    language?: string
    currency?: string
    marketingOptIn?: boolean
  }

  // Security
  isEmailVerified?: boolean
  isActive?: boolean
  refreshTokens?: Array<{
    token: string
    expiresAt: Date
    deviceId?: string
  }>
  lastLoginAt?: Date

  createdAt: Date
  updatedAt: Date
}


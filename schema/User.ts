import mongoose, { Schema, Model } from 'mongoose'
import { AddressSchema } from './SharedSchemas'

export interface IUser extends mongoose.Document {
  email: string
  password?: string
  firstName?: string
  lastName?: string
  avatar?: string
  roles: Array<'customer' | 'super_admin' | 'admin' | 'editor' | 'support'>
  addresses: (typeof AddressSchema)[]
  wishlist: mongoose.Types.ObjectId[]
  preferences: {
    language?: string
    currency?: string
    marketingOptIn?: boolean
  }
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

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
    avatar: String,
    roles: [
      {
        type: String,
        enum: ['customer', 'super_admin', 'admin', 'editor', 'support'],
        default: 'customer',
      },
    ],
    addresses: [AddressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'CatalogProduct' }],
    preferences: {
      language: { type: String, default: 'en' },
      currency: { type: String, default: 'USD' },
      marketingOptIn: { type: Boolean, default: false },
    },
    isEmailVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    refreshTokens: [
      {
        token: String,
        expiresAt: Date,
        deviceId: String,
      },
    ],
    lastLoginAt: Date,
  },
  { timestamps: true }
)

// Indexes
UserSchema.index({ email: 1 }, { unique: true })

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User

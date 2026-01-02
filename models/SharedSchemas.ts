import { Types } from 'mongoose'

// ✅ Money: Precise financial math
export interface Money {
  amount: number // e.g., 1000 = $10.00
  currency: string // ISO currency code, e.g., 'USD'
}

// ✅ Address: Global ISO standard
export interface Address {
  _id?: Types.ObjectId
  firstName?: string
  lastName?: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  postalCode: string
  countryCode: string // ISO country code, e.g., 'US'
  phone?: {
    countryCode?: string
    number?: string
  }
  email?: string
  type?: 'billing' | 'shipping'
  isDefault?: boolean
}

// ✅ Localization: i18n support
export interface LocalizedString {
  en: string
  es?: string
  fr?: string
  de?: string
  [key: string]: string | undefined // Allow other language codes
}

// ✅ SEO: Meta tags
export interface SEO {
  title?: LocalizedString
  description?: LocalizedString
  keywords?: string[]
  slug?: string
  canonicalUrl?: string
}

// ✅ Media: Images/Videos
export interface Media {
  url: string
  alt?: string
  type?: 'image' | 'video'
  isPrimary?: boolean
}

// ✅ Dimensions: Physical product dimensions
export interface Dimension {
  length?: number
  width?: number
  height?: number
  weight?: number
  unit?: string // 'cm', 'in', 'kg', 'lb', etc.
}


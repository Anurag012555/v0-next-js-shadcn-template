import { Types, Document } from 'mongoose'

export interface ITaxRule extends Document {
  _id: Types.ObjectId
  countryCode: string // ISO country code, e.g., "DE" (2 characters)
  regionCode?: string // "BV" (Bavaria) - Optional

  productTaxCode: string // "A_BOOKS"

  name: string // "VAT Standard"
  rate: number // 0.19

  priority?: number
  isCompound?: boolean
}


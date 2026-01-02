import { Types, Document } from 'mongoose'
import { LocalizedString, Money } from './SharedSchemas'

/**
 * Product Options
 * Customizable options for products (engraving, gift wrap, etc.)
 * Different from variants - these are add-ons/customizations
 */
export interface OptionChoice {
  label: LocalizedString
  value: string
  price?: Money // Additional price for this choice
  image?: string
  isDefault?: boolean
}

export interface IProductOption extends Document {
  _id: Types.ObjectId
  product: Types.ObjectId // Reference to CatalogProduct
  variant?: Types.ObjectId // Reference to ProductVariant (if variant-specific)

  name: LocalizedString // "Engraving", "Gift Wrap", "Size"
  description?: LocalizedString

  // Option Type
  type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'date' | 'number'
  // text: Single line text input
  // textarea: Multi-line text input
  // select: Dropdown selection
  // radio: Radio button selection
  // checkbox: Checkbox selection
  // file: File upload
  // date: Date picker
  // number: Number input

  // Choices (for select, radio, checkbox)
  choices?: OptionChoice[]

  // Validation
  required: boolean
  minLength?: number // For text/textarea
  maxLength?: number // For text/textarea
  min?: number // For number
  max?: number // For number
  pattern?: string // Regex pattern for validation

  // Pricing
  hasPrice: boolean // If true, option affects price
  priceType?: 'fixed' | 'percentage' // How price is calculated
  defaultPrice?: Money

  // Display
  sortOrder?: number
  isActive: boolean

  createdAt: Date
  updatedAt: Date
}

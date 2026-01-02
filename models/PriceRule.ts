import { Types, Document } from 'mongoose'
import { LocalizedString } from './SharedSchemas'

/**
 * Price Rules
 * Advanced pricing strategies (tier pricing, volume discounts, customer groups, etc.)
 */
export interface PriceRuleCondition {
  // Quantity-based
  minQuantity?: number
  maxQuantity?: number

  // Customer-based
  customerGroups?: string[] // ['VIP', 'Wholesale']
  customerTags?: string[]

  // Product-based
  categories?: Types.ObjectId[]
  brands?: Types.ObjectId[]
  products?: Types.ObjectId[]
  tags?: string[]

  // Date-based
  startDate?: Date
  endDate?: Date

  // Location-based
  countries?: string[]
  regions?: string[]

  // Order-based
  minOrderValue?: number
  maxOrderValue?: number
}

export interface IPriceRule extends Document {
  _id: Types.ObjectId
  name: string
  description?: LocalizedString

  type: 'tier' | 'volume' | 'customer_group' | 'date_range' | 'location' | 'bundle'
  // tier: Quantity-based tier pricing
  // volume: Volume discounts
  // customer_group: Customer group pricing
  // date_range: Time-based pricing
  // location: Geographic pricing
  // bundle: Bundle pricing

  conditions: PriceRuleCondition

  // Pricing
  pricing: {
    type: 'percentage' | 'fixed_amount' | 'fixed_price'
    value: number // Percentage or fixed amount
  }

  // Priority (higher = applied first)
  priority: number

  // Status
  isActive: boolean
  isExclusive?: boolean // If true, stops other rules from applying

  createdAt: Date
  updatedAt: Date
}


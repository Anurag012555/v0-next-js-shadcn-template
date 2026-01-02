import mongoose, { Schema, Model } from 'mongoose'

export interface ITaxRule extends mongoose.Document {
  countryCode: string
  regionCode?: string
  productTaxCode: string
  name: string
  rate: number
  priority?: number
  isCompound?: boolean
}

const TaxRuleSchema = new Schema<ITaxRule>(
  {
    countryCode: { type: String, required: true, minlength: 2, maxlength: 2 },
    regionCode: String,
    productTaxCode: { type: String, required: true, index: true },
    name: { type: String, required: true },
    rate: { type: Number, required: true },
    priority: { type: Number, default: 0 },
    isCompound: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Indexes
TaxRuleSchema.index({ productTaxCode: 1 })
TaxRuleSchema.index({ countryCode: 1, regionCode: 1 })

const TaxRule: Model<ITaxRule> = mongoose.models.TaxRule || mongoose.model<ITaxRule>('TaxRule', TaxRuleSchema)

export default TaxRule


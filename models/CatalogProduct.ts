import { Types, Document } from 'mongoose'
import { LocalizedString, SEO, Media, Dimension } from './SharedSchemas'

export interface ProductAttribute {
  key: string // "processor"
  label: LocalizedString // { en: "Processor", es: "Procesador" }
  value: LocalizedString // { en: "M1 Pro", es: "M1 Pro" }
}

export interface VariationAttribute {
  key: string // "color"
  value: string | string[] // "Red" or ["Red", "Blue"]
}

export interface ICatalogProduct extends Document {
  _id: Types.ObjectId
  // ✅ Identification
  title: LocalizedString
  slug?: string // Normalized URL
  brand?: Types.ObjectId // Reference to Brand
  categories?: Types.ObjectId[] // References to Category

  // ✅ Global Standards
  asin?: string // Internal Unique ID
  gtin?: string // UPC/EAN/ISBN for matching

  // ✅ Polymorphic Type Config
  productType: 'physical' | 'digital' | 'service'

  // 1. Physical Specs (Only if type == physical)
  physicalSpecs?: {
    dimensions?: Dimension
    material?: LocalizedString
    originCountry?: string // ISO Code "IT", "CN"
    attributes?: ProductAttribute[]
  }

  // 2. Digital Specs (Only if type == digital)
  digitalSpecs?: {
    format?: 'ebook' | 'video' | 'software' | 'audio'
    drmEnabled?: boolean
    fileSizeMB?: number
    systemRequirements?: LocalizedString
  }

  // ✅ Variation Logic (Parent/Child)
  variation?: {
    type?: 'standalone' | 'parent' | 'child'
    parentAsin?: string // Links Child -> Parent
    theme?: string // e.g., "SizeColor"
    attributes?: VariationAttribute[]
  }

  // ✅ Financials
  taxCode?: string // Links to TaxRule, default: 'A_GEN_STANDARD'

  // Media & Content
  description?: LocalizedString
  media?: Media[]

  // Aggregates (Updated via worker)
  rating?: {
    average?: number
    count?: number
  }

  seo?: SEO
  isActive?: boolean

  createdAt: Date
  updatedAt: Date
}


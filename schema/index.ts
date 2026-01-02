// MongoDB Mongoose Models - Vercel Compatible
// Export connection function
export { default as connectDB } from '../../lib/mongodb'

// Core Models
export { default as User, IUser } from './User'
export { default as CatalogProduct, ICatalogProduct } from './CatalogProduct'
export { default as Order, IOrder } from './Order'
export { default as Cart, ICart } from './Cart'
export { default as Category, ICategory } from './Category'
export { default as Brand, IBrand } from './Brand'
export { default as Review, IReview } from './Review'
export { default as Wishlist, IWishlist } from './Wishlist'
export { default as Seller, ISeller } from './Seller'
export { default as Offer, IOffer } from './Offer'
export { default as Discount, IDiscount } from './Discount'
export { default as TaxRule, ITaxRule } from './TaxRule'
export { default as ShippingTemplate, IShippingTemplate } from './ShippingTemplate'
export { default as Warehouse, IWarehouse } from './Warehouse'
export { default as Content, IContent } from './Content'
export { default as Ticket, ITicket } from './Ticket'
export { default as AuditLog, IAuditLog } from './AuditLog'

// Advanced Inventory Management
export { default as StockMovement, IStockMovement } from './StockMovement'
export { default as StockReservation, IStockReservation } from './StockReservation'
export { default as WarehouseInventory, IWarehouseInventory } from './WarehouseInventory'
export { default as StockTransfer, IStockTransfer } from './StockTransfer'
export { default as InventoryCost, IInventoryCost } from './InventoryCost'

// Product Management
export { default as ProductVariant, IProductVariant } from './ProductVariant'
export { default as ProductBundle, IProductBundle } from './ProductBundle'
export { default as ProductRelation, IProductRelation } from './ProductRelation'
export { default as ProductTag, IProductTag } from './ProductTag'
export { default as Collection, ICollection } from './Collection'
export { default as ProductOption, IProductOption } from './ProductOption'

// Pricing & Returns
export { default as PriceRule, IPriceRule } from './PriceRule'
export { default as ReturnRequest, IReturnRequest } from './ReturnRequest'

// Shared Schemas (for use in other schemas)
export * from './SharedSchemas'


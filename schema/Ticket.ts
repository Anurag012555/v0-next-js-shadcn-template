import mongoose, { Schema, Model } from 'mongoose'

export interface ITicket extends mongoose.Document {
  ticketId: string
  customer: mongoose.Types.ObjectId
  assignedTo?: mongoose.Types.ObjectId
  type: 'order_issue' | 'payment' | 'product_inquiry' | 'tech_support'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  status?: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed'
  subject: string
  relatedOrder?: mongoose.Types.ObjectId
  messages: Array<{
    sender: mongoose.Types.ObjectId
    message: string
    attachments?: string[]
    isInternalNote?: boolean
    readAt?: Date
  }>
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

const MessageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    attachments: [String],
    isInternalNote: { type: Boolean, default: false },
    readAt: Date,
  },
  { timestamps: true }
)

const TicketSchema = new Schema<ITicket>(
  {
    ticketId: { type: String, required: true, unique: true },
    customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
    type: {
      type: String,
      enum: ['order_issue', 'payment', 'product_inquiry', 'tech_support'],
      required: true,
    },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'waiting_customer', 'resolved', 'closed'],
      default: 'open',
    },
    subject: { type: String, required: true },
    relatedOrder: { type: Schema.Types.ObjectId, ref: 'Order' },
    messages: [MessageSchema],
    tags: [String],
  },
  { timestamps: true }
)

// Indexes
TicketSchema.index({ ticketId: 1 }, { unique: true })
TicketSchema.index({ customer: 1 })
TicketSchema.index({ status: 1 })

const Ticket: Model<ITicket> = mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema)

export default Ticket


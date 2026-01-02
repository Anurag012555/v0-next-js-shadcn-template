import { Types, Document } from 'mongoose'

export interface Message {
  sender: Types.ObjectId // Reference to User
  message: string
  attachments?: string[] // URLs to files
  isInternalNote?: boolean // Only visible to admin
  readAt?: Date

  createdAt: Date
  updatedAt: Date
}

export interface ITicket extends Document {
  _id: Types.ObjectId
  ticketId: string // Readable ID (e.g., T-1002)
  customer: Types.ObjectId // Reference to User
  assignedTo?: Types.ObjectId // Reference to User - Support Agent

  type: 'order_issue' | 'payment' | 'product_inquiry' | 'tech_support'
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  status?: 'open' | 'in_progress' | 'waiting_customer' | 'resolved' | 'closed'

  subject: string
  relatedOrder?: Types.ObjectId // Reference to Order

  messages: Message[]

  tags?: string[]

  createdAt: Date
  updatedAt: Date
}

import mongoose, { Schema, Model } from 'mongoose'

export interface IAuditLog extends mongoose.Document {
  user?: mongoose.Types.ObjectId
  action: string
  resource: string
  resourceId?: mongoose.Types.ObjectId
  ipAddress?: string
  userAgent?: string
  changes?: Map<string, any>
  timestamp: Date
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    action: { type: String, required: true },
    resource: { type: String, required: true },
    resourceId: Schema.Types.ObjectId,
    ipAddress: String,
    userAgent: String,
    changes: { type: Map, of: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now, expires: '1y' }, // TTL index - auto-delete after 1 year
  },
  { timestamps: false }
)

// Indexes
AuditLogSchema.index({ user: 1 })
AuditLogSchema.index({ resource: 1, resourceId: 1 })
AuditLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 31536000 }) // 1 year in seconds

const AuditLog: Model<IAuditLog> = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema)

export default AuditLog


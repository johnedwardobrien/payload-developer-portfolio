import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantIDs'
import { Access } from 'payload'

export const mediaRead: Access = ({ req }) => {
  if (!req.user) {
    return false
  }

  return {
    'tenant.id': {
      in: getUserTenantIDs(req.user, 'tenant-viewer'),
    },
    // isVideoThumbnail: {
    //   equals: false,
    // },
  }
}

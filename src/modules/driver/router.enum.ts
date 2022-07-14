export enum DRIVER_ROUTERS {
  ADMIN_MANAGE = '/admin/driver',
  ADMIN_CREATE = '/admin/driver/create',
  ADMIN_EDIT = '/admin/driver/:userId',
  ADMIN_MANAGE_DELETED = '/admin/driver/deleted',
}

export enum DRIVER_API {
  PREFIX = '/api/driver',
  TRUCKOWNER_PREFIX = '/api/truck-owner/driver',
  ADMIN_PREFIX = '/api/admin/drivers',
}

export enum ADMIN_ORDER_ROUTERS {
  ADMIN_MANAGE = '/admin/order',
  ADMIN_EDIT = '/admin/order/edit/:orderID',
  ORDERDETAIL = '/admin/order/:orderID',
  ADMIN_CREATE = '/admin/order/create',
  ADMIN_REPORT = '/admin/orders/report',
  TRACKING_TRUCK = '/admin/order/:orderID/tracking-truck/:truckID',
}
export enum CUSTOMER_ORDER_ROUTERS {
  MANAGE = '/order',
  MANAGE_PAYMENTS = '/payment',
  CREATE = '/order/create',
  THANKYOU = '/order/:orderID/thankyou',
  ORDERDETAIL = '/order/:orderID',
  EDIT = '/order/edit/:orderID',
  REPORT = '/order/report',
  QUOTATION = '/quotations',
  TRACKING_TRUCK = '/order/:orderID/tracking-truck/:truckID',
}

export enum TRUCKOWNER_ORDER_ROUTERS {
  ORDER = '/order',
  NEW_MANAGE = '/order/new',
  // PENDING_ORDER = '/order/pending',
  ORDERDETAIL = '/order/:orderID',
  // JOBS = '/order/delivering',
  REPORT = '/order/report',
  TRACKING_TRUCK = '/order/:orderID/tracking-truck/:truckID',
}

export enum ORDER_API {
  PREFIX = '/api/order',
  CUSTOMER_PREFIX = 'api/customer/orders',
  ORDER_CUSTOMER_PREFIX = 'api/customer/order',
  ADMIN_PREFIX = 'api/admin/orders',
  ORDER_ADMIN_PREFIX = 'api/admin/order',
  TRUCK_OWNER_PREFIX = 'api/truck-owner',
}

export enum BLACK_BOX_API {
  PREFIX = '/api/black-box',
}

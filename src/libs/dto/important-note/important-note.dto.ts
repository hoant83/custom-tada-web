export enum IMPORTANT_NOTE_ROLE {
  CUSTOMER = 'CUSTOMER',
  TRUCK_OWNER = 'TRUCK_OWNER',
}

export interface ImportantNote {
  id?: number;
  content: string;
  type: IMPORTANT_NOTE_ROLE;
  isOn: boolean;
}

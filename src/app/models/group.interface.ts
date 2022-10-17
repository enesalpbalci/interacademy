import { Facility } from "./facility.interface";


export interface Group {
  id: number;
  name: string;
  facilityId: number;
  deleted: true;
  facility: Facility
}

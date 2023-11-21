export interface Rent {
  _id: string;
  type: string;
  amount: number;
}

export class Property {
  _id: number;
  name: string;
  address: string;
  rents: Rent[];
  // Add any other properties you need

  constructor(id: number, name: string, address: string, rents: Rent[]) {
    this._id = id;
    this.name = name;
    this.address = address;
    this.rents = rents;
  }
}

interface ContactInfo {
  phone: string;
  email: string;
  job: string;
  job_address: string;
  job_phone: string;
}

export class Tenant {
  _id: number;
  first_name: string;
  last_name: string;
  contact_info: ContactInfo;
  move_in_date: string;
  leases: Lease[];

  // Add any other properties you need

  constructor(
    _id: number,
    first_name: string,
    last_name: string,
    contact_info: ContactInfo,
    move_in_date: string,
    leases: Lease[]
  ) {
    this._id = _id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.contact_info = contact_info;
    this.move_in_date = move_in_date;
    this.leases = leases;
  }
}

export class Lease {
  _id: string;
  tenant: Tenant | null;
  property: Property | null;
  lease_start_date: Date;
  lease_end_date: Date;
  rent_plan: string;
  security_deposit: number;
  lease_terms: string;
  status: string;

  constructor(
    _id: string,
    tenant: Tenant,
    property: Property,
    lease_start_date: Date,
    lease_end_date: Date,
    rent_plan: string,
    security_deposit: number,
    lease_terms: string,
    status: string
  ) {
    this._id = _id;
    this.tenant = tenant;
    this.property = property;
    this.lease_start_date = lease_start_date;
    this.lease_end_date = lease_end_date;
    this.rent_plan = rent_plan;
    this.security_deposit = security_deposit;
    this.lease_terms = lease_terms;
    this.status = status;
  }
}

export interface CompanyDto {
  name?: string;
  phone?: string;
  address?: string;
  licenseNo?: string;
  businessLicenseUrl?: string;
  companyIconUrl?: string;
}

export interface CompanyFilterDto {
  skip: number;
  take: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
  status?: string;
}

export interface UpdateCompany {
  name?: string;
  phone?: string;
  address?: string;
  licenseNo?: string;
}

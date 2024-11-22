import { BaseRecord, Status } from './common';

export type FrameworkType = 'CDP' | 'BRSR' | 'GRI' | 'ESRS' | 'SASB';

export interface Framework extends BaseRecord {
  name: string;
  description?: string;
  version: string;
  framework_type: FrameworkType;
  reporting_year: string;
  status: Status;
}

export type CreateFrameworkInput = Omit<Framework, keyof BaseRecord>;

export type UpdateFrameworkInput = Partial<CreateFrameworkInput>;

export interface FrameworkWithSections extends Framework {
  sections: Section[];
}
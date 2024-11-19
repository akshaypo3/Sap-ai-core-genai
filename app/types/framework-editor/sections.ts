import { BaseRecord } from './common';

export interface Section extends BaseRecord {
  framework_id: string;
  parent_section_id?: string;
  section_code: string;
  name: string;
  description?: string;
  order_index: number;
  is_required: boolean;
}

export interface SectionWithQuestions extends Section {
  questions: Question[];
  subsections: Section[];
}

export type CreateSectionInput = Omit<Section, keyof BaseRecord>;

export type UpdateSectionInput = Partial<CreateSectionInput>;

export interface SectionOrderUpdate {
  id: string;
  order_index: number;
}
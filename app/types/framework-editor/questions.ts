import { BaseRecord, ValidationRule } from '@/app/types/framework-editor/common';

export type QuestionType =
  | 'short_text'
  | 'long_text'
  | 'rich_text'
  | 'number'
  | 'decimal'
  | 'single_select'
  | 'multi_select'
  | 'date'
  | 'datetime'
  | 'file_upload'
  | 'table'
  | 'matrix'
  | 'percentage'
  | 'currency'
  | 'unit_value';

export interface SelectOption {
  label: string;
  value: string;
  metadata?: Record<string, any>;
}

export interface TableColumn {
  id: string;
  name: string;
  type: QuestionType;
  required: boolean;
  validation?: ValidationRule[];
  options?: SelectOption[]; // For select columns
}

export interface AnswerConfig {
 
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  
 
  min?: number;
  max?: number;
  decimals?: number;
  unit?: string;
  
 
  options?: SelectOption[];
  multipleSelect?: boolean;
  

  columns?: TableColumn[];
  minRows?: number;
  maxRows?: number;
  

  allowedTypes?: string[];
  maxSize?: number;
  maxFiles?: number;
  

  minDate?: string;
  maxDate?: string;
  dateFormat?: string;
  

  customValidation?: string;
  dependencies?: QuestionDependency[];
}

export interface Question extends BaseRecord {
  section_id: string;
  question_code: string;
  question_text: string;
  help_text?: string;
  question_type: QuestionType;
  order_index: number;
  is_required: boolean;
  is_repeatable: boolean;
  answer_config: AnswerConfig;
  validation_rules: ValidationRule[];
}

export interface QuestionDependency {
  question_id: string;
  dependent_question_id: string;
  condition_type: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
  condition_value: any;
}

export type CreateQuestionInput = Omit<Question, keyof BaseRecord>;

export type UpdateQuestionInput = Partial<CreateQuestionInput>;
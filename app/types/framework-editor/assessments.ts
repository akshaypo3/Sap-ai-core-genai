import { BaseRecord } from './common';

export type AssessmentStatus = 'in_progress' | 'completed' | 'archived';

export interface Assessment extends BaseRecord {
  framework_id: string;
  name: string;
  status: AssessmentStatus;
  reporting_period_start: string;
  reporting_period_end: string;
}

export interface AssessmentQuestion extends Omit<Question, 'id' | 'section_id'> {
  assessment_id: string;
  original_question_id: string;
  section_code: string;
}

export type AnswerStatus = 'draft' | 'submitted' | 'reviewed' | 'approved';

export interface Answer extends BaseRecord {
  assessment_id: string;
  assessment_question_id: string;
  answer_value: any;
  status: AnswerStatus;
  reviewed_by?: string;
  submitted_at?: string;
  reviewed_at?: string;
}

export interface AnswerAttachment extends BaseRecord {
  answer_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  uploaded_by: string;
}

export type CreateAssessmentInput = Omit<Assessment, keyof BaseRecord>;

export type CreateAnswerInput = Omit<Answer, keyof BaseRecord>;
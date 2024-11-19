export type Timestamp = string;

export type MetadataRecord = Record<string, any>;

export interface BaseRecord {
  id: string;
  created_at: Timestamp;
  updated_at: Timestamp;
  created_by: string;
  metadata: MetadataRecord;
}

export type Status = 'draft' | 'active' | 'archived';

export type ValidationRule = {
  type: 'required' | 'pattern' | 'min' | 'max' | 'minLength' | 'maxLength' | 'custom';
  value: any;
  message: string;
  customValidator?: (value: any) => boolean;
};

export interface APIResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}
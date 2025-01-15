import { z } from "zod";

export const TemplateFormSchema = z.object({
  name: z.string().min(3, "Template Name is required"),

  description: z.string().min(10, "Description is required"),
  
  category: z.string().min(3, "Category Name is required"),
  
  content: z.string().min(3, "Content Name is required"),
  
  created_by: z.string().optional(),
  
  updated_by: z.string().optional(),

});

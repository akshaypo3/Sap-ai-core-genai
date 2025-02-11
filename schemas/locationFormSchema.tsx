import { z } from 'zod';

// Define Zod validation schema
export const locationFormSchema = z.object({
    name: z
    .string()
    .min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  location_type: z.string().nonempty('Location Type is required'),
  employee_count: z.string().nonempty('Employee Count is required'),
  autocomplete: z.string().min(3,'Please enter a valid location'),
  street: z.string().optional(),
  postalcode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

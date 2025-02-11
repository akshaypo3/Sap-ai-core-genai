"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
import { addEmailTemplate } from '@/lib/settings/emailtemplates/action';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from "use-intl";
import { useRouter } from "next/navigation"; // Import useRouter hook

const emailTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  templateKey: z.string().min(1, 'Template Key is required'),
  subject: z.string().min(1, 'Subject is required'),
  bodyHtml: z.string().min(1, 'HTML Body is required'),
  bodyText: z.string().min(1, 'Plain Text Body is required'),
  senderName: z.string().min(1, 'Sender Name is required'),
  senderEmail: z.string().email('Invalid email address').min(1, 'Sender Email is required'),
  replyTo: z.string().email('Invalid email address').min(1, 'Reply To is required'),
  variables: z.object({}).optional(),
  category: z.string().min(1, 'Category is required'),
});

type FormData = z.infer<typeof emailTemplateSchema>;

const AddEmailTemplate = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(emailTemplateSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addEmailTemplate(
        data.name,
        data.description,
        data.subject,
        data.bodyHtml,
        data.bodyText,
        data.templateKey,
        true, 
        data.variables,
        data.category,
        data.senderName,
        data.senderEmail,
        data.replyTo
      );

      setSuccess(''); // Reset success message
      setError(''); // Reset error message
      reset(); // Reset the form
    } catch (err) {
      setError('Failed to save template');
    }
  };

  const t = useTranslations('settings');
  const router = useRouter(); // Initialize the router

  const handleBackClick = () => {
    router.back(); // Navigate to the previous page
  };

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-6">
      <Breadcrumb className="flex items-center justify-between p-6 bg-gray-50 rounded-t">
        <BreadcrumbItem className="font-bold text-xl">{t('administration.E-Mail Template')}</BreadcrumbItem>
        <Button className="bg-green-500" onClick={handleBackClick}>
          Back
        </Button>
      </Breadcrumb>

      <form className="space-y-6 m-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">{t('administration.Name')}</label>
            <Input {...register('name')} className="p-3" />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Description')}</label>
            <Input {...register('description')} className="p-3" />
            {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Template Key')}</label>
            <Input {...register('templateKey')} className="p-3" />
            {errors.templateKey && <p className="text-red-600 text-sm">{errors.templateKey.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Subject')}</label>
            <Input {...register('subject')} className="p-3" />
            {errors.subject && <p className="text-red-600 text-sm">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-medium">{t('administration.Sender Name')}</label>
            <Input {...register('senderName')} className="p-3" />
            {errors.senderName && <p className="text-red-600 text-sm">{errors.senderName.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Sender Email')}</label>
            <Input {...register('senderEmail')} className="p-3" />
            {errors.senderEmail && <p className="text-red-600 text-sm">{errors.senderEmail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Reply To')}</label>
            <Input {...register('replyTo')} className="p-3" />
            {errors.replyTo && <p className="text-red-600 text-sm">{errors.replyTo.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium">{t('administration.Category')}</label>
          <Input {...register('category')} className="p-3 w-1/2" />
          {errors.category && <p className="text-red-600 text-sm">{errors.category.message}</p>}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium">{t('administration.Body <HTML>')}</label>
          <textarea {...register('bodyHtml')} className="p-3 border rounded-md w-full h-48" />
          {errors.bodyHtml && <p className="text-red-600 text-sm">{errors.bodyHtml.message}</p>}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium">{t('administration.Body Plain text (fallback)')}</label>
          <textarea {...register('bodyText')} className="p-3 border rounded-md w-full h-48" />
          {errors.bodyText && <p className="text-red-600 text-sm">{errors.bodyText.message}</p>}
        </div>

        {error && <div className="text-red-600 mt-4">{error}</div>}
        {success && <div className="text-green-600 mt-4">{success}</div>}

        <div className="text-right mt-8">
          <Button type="submit" className="px-6 py-3 bg-black text-white">{t('administration.Save')}</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEmailTemplate;

"use client";
import React, { useEffect, useState } from 'react';
import { updateEmailTemplate, fetchEmailTemplateById } from '@/lib/settings/emailtemplates/action'; // Import functions
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb';
import { z } from 'zod';
import { useTranslations } from "use-intl";

const emailTemplateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  template_key: z.string().min(1, "Template Key is required"),
  subject: z.string().min(1, "Subject is required"),
  sender_name: z.string().min(1, "Sender Name is required"),
  sender_email: z.string().email("Invalid sender email format"),
  reply_to: z.string().email("Invalid reply-to email format"),
  category: z.string().min(1, "Category is required"),
  body_html: z.string().min(1, "HTML Body is required"),
  body_text: z.string().min(1, "Plain Text Body is required"),
});

interface UpdateEmailTempProps {
  id: string; 
  template?: any;
}

const UpdateEmailTemp: React.FC<UpdateEmailTempProps> = ({ id, template }) => {
  const [emailTemplate, setEmailTemplate] = useState(template || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!template) {
      fetchEmailTemplateById(id)
        .then((data) => setEmailTemplate(data))
        .catch((err) => {
          console.error(err);
          setError('Failed to fetch email template.');
        });
    }
  }, [id, template]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailTemplate || !emailTemplate.id) {
      setError("Invalid email template ID");
      return;
    }

    setFormErrors([]);
    setLoading(true);
    setError(null);

    try {
      const validationResult = emailTemplateSchema.safeParse(emailTemplate);

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map((err) => err.message);
        setFormErrors(errors);
        setLoading(false);
        return;
      }

      await updateEmailTemplate(
        emailTemplate.name,
        emailTemplate.description,
        emailTemplate.subject,
        emailTemplate.body_html,
        emailTemplate.body_text,
        emailTemplate.template_key,
        emailTemplate.active,
        emailTemplate.variables,
        emailTemplate.category,
        emailTemplate.sender_name,
        emailTemplate.sender_email,
        emailTemplate.reply_to,
        emailTemplate.version,
        emailTemplate.id 
      );

      alert("Email template updated successfully!");
    } catch (err) {
      setError("Failed to update email template.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!emailTemplate) {
    return <div>Loading...</div>;
  }
  const t = useTranslations('settings');

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-md border mt-8 p-6">
      <Breadcrumb className="flex items-center justify-between p-6 bg-gray-50 rounded-t">
        <BreadcrumbItem className="font-bold text-xl">{t('administration.E-Mail Template')}</BreadcrumbItem>
      </Breadcrumb>

      <form className="space-y-6 m-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium">{t('administration.Name')}</label>
            <Input
              type="text"
              value={emailTemplate.name}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, name: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Description')}</label>
            <Input
              type="text"
              value={emailTemplate.description}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, description: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Template Key')}</label>
            <Input
              type="text"
              value={emailTemplate.template_key}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, template_key: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Subject')}</label>
            <Input
              type="text"
              value={emailTemplate.subject}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, subject: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Sender Name')}</label>
            <Input
              type="text"
              value={emailTemplate.sender_name}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, sender_name: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Sender Email')}</label>
            <Input
              type="email"
              value={emailTemplate.sender_email}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, sender_email: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Reply To')}</label>
            <Input
              type="email"
              value={emailTemplate.reply_to}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, reply_to: e.target.value })}
              className="p-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">{t('administration.Category')}</label>
            <Input
              type="text"
              value={emailTemplate.category}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, category: e.target.value })}
              className="p-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">{t('administration.Body <HTML>')}</label>
          <textarea
            value={emailTemplate.body_html}
            onChange={(e) => setEmailTemplate({ ...emailTemplate, body_html: e.target.value })}
            className="p-3 w-full h-96 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">{t('administration.Body Plain text (fallback)')}</label>
          <textarea
            value={emailTemplate.body_text}
            onChange={(e) => setEmailTemplate({ ...emailTemplate, body_text: e.target.value })}
            className="p-3 w-full h-96 border rounded-md"
          />
        </div>

        {formErrors.length > 0 && (
          <div className="text-red-500 text-sm mt-2">
            {formErrors.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" className="bg-black text-white mt-6" disabled={loading}>
            {loading ? "Saving..." : t("administration.Save")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmailTemp;

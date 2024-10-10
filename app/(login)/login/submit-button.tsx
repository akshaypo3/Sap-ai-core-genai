"use client";

import { useFormStatus } from "react-dom";
import { type ComponentProps } from "react";
import { useTranslations } from 'next-intl';

type Props = ComponentProps<"button"> & {
  pendingText?: string;
};

export function SubmitButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();
  const t = useTranslations('login');
  const isPending = pending && action === props.formAction;

  return (
    <button {...props} type="submit" aria-disabled={pending}>
      {isPending ? t('signing_in', { default: pendingText }) : children}
    </button>
  );
}

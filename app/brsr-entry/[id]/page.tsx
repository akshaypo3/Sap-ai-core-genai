import BRSRTable from '@/components/demo/BRSRTable';
import { useTranslations } from 'next-intl';

export default function BRSRPage() {
  const t = useTranslations('brsr-entry');
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{t("BRSR Report")}</h1>
      <BRSRTable />
    </div>
  );
}
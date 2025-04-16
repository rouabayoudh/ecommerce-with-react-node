import {useTranslations} from 'next-intl';
 
export default function HomePage() {
  const t = useTranslations('message');
  return <h1>{t('title')}</h1>;
}
import {getTranslations} from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HomePage');

  return (
    <main className="p-26">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <p>{t('description')}</p>
    </main>
  );
}
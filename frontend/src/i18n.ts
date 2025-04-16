import {getRequestConfig} from 'next-intl/server';
import { headers  } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  
  const locale =  getUserLanguageFromHeaders();
  
  return {
    locale,
    messages: (await import(`/src/i18n/${locale}/${locale}.json`)).default
  };
});

function getUserLanguageFromHeaders() {
  const acceptLanguage = headers().get('accept-language');
  return acceptLanguage?.split(',')[0].split('-')[0] || 'en'; // Fallback to 'en'
}
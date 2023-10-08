import translations from '@/locale/nl.json'


type TranslationType = typeof translations

type DeepKeys<T> = T extends object
    ? {
        [K in keyof T]-?: K extends string | number
            ? `${K}` | `${DeepKeys<T[K]>}`
            : never;
    }[keyof T]
    : never;


export const t = (key: string) => {
    const translatedValue = key.split('.').reduce((o:any, i) => {
        const reduceKey = i as DeepKeys<TranslationType>
        return o[reduceKey]
    }, translations)
    if (translatedValue) {
        return translatedValue
    } else {
        // If the key doesn't exist, return a fallback message or the key itself
        return key;
    }
}
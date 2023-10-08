import './App.css'
import TranslationHelper from '@/components/TranslationHelper.tsx'
import TranslationHub from "@/components/TranslationHub.tsx";
import {t} from '@/hooks/useTranslation.ts'

function App() {

    return (
        <>
            <div>Simple translation React Dev Page</div>
            <TranslationHelper translationKey={'general.greeting'}>
                <TranslationHelper.Translation>{t('general.greetings')}</TranslationHelper.Translation>
                <TranslationHelper.Fallback>Click Me - fallback </TranslationHelper.Fallback>
            </TranslationHelper>
            <TranslationHub active={true} position={'bottom-right'} />
        </>
    )
}

export default App

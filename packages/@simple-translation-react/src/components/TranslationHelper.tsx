import React, {ReactNode, ElementType, useState, useEffect} from 'react';
import {t} from '@/hooks/useTranslation.ts'
import ReactDOM from "react-dom";

type Props = {
    children: ReactNode,
    as?: ElementType; // ElementType can be either a string (HTML element) or a React component.
    translationKey: string
}


const getChildrenOnDisplayNAme = (children: ReactNode, displayName: string) => {
    return React.Children.map(children, (child: ReactNode) => {
        if (React.isValidElement(child)) {
            const childType = child.type as { displayName?: string };
            if (childType.displayName === displayName) {
                return child
            }
        }
    })
}
const TranslationHelper: React.FC<Props> & {
    Fallback: typeof Fallback,
    Translation: typeof Translation,
} = ({children, translationKey}) => {
    let showKeyValue = false
    const localStorageKey = 'simple-translation-show-translation-keys'
    const localStorageValue = localStorage.getItem(localStorageKey)
    if (localStorageValue !== null) {
        showKeyValue = JSON.parse(localStorageValue) ?? false
    }

    const [showKey, setShowKey] = useState(showKeyValue);
    useEffect(() => {
        const handleStorageChange = () => {
            const localStorageGetValue = localStorage.getItem(localStorageKey)
            if (localStorageGetValue !== null) {
                setShowKey(JSON.parse(localStorageGetValue))
            }
        };

        // Add the event listener
        window.addEventListener('simple-translation-show-translations-update', handleStorageChange);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('simple-translation-show-translations-update', handleStorageChange);
        };
    }, []);

    const translation = getChildrenOnDisplayNAme(children, 'Translation')
    const fallback = getChildrenOnDisplayNAme(children, 'Fallback')
    let translationWithKey = null
    if(translation !== undefined && translation !== null) {
        // Add translationKey to the translation component
        translationWithKey = React.cloneElement(translation[0], {translationKey: translationKey})
    }
    return (
        <>
            {translationWithKey}
            {fallback}
        </>
    )

}

type SubComponentProps = {
    children?: ReactNode,
    displayName?: string
}


const Fallback = ({children}: SubComponentProps) => {
    return (
        <>
            {children}
        </>
    )
}
Fallback.displayName = 'Fallback'
TranslationHelper.Fallback = Fallback

const Translation = ({children}: SubComponentProps & { translationKey: string}) => {
    console.log('children', children)
    return (
        <>
            {children}
        </>
    )
}

Translation.displayName = 'Translation'
TranslationHelper.Translation = Translation

export default TranslationHelper

//
// let showKeyValue = false
// const localStorageKey = 'simple-translation-show-translation-keys'
// const localStorageValue = localStorage.getItem(localStorageKey)
// if (localStorageValue !== null) {
//     showKeyValue = JSON.parse(localStorageValue) ?? false
// }
//
// const [showKey, setShowKey] = useState(showKeyValue);
// useEffect(() => {
//     const handleStorageChange = () => {
//         const localStorageGetValue = localStorage.getItem(localStorageKey)
//         if (localStorageGetValue !== null) {
//             setShowKey(JSON.parse(localStorageGetValue))
//         }
//     };
//
//     // Add the event listener
//     window.addEventListener('simple-translation-show-translations-update', handleStorageChange);
//
//     return () => {
//         // Remove the event listener when the component unmounts
//         window.removeEventListener('simple-translation-show-translations-update', handleStorageChange);
//     };
// }, []);
// const translatedValue = t(translationKey)
// const translationKeyExists = translatedValue !== translationKey
// const fallback = getChildrenOnDisplayNAme(children, 'Fallback')
// const localizedText = translationKeyExists ? translatedValue : fallback
// return (
//     showKey ? translationKey : localizedText
// )
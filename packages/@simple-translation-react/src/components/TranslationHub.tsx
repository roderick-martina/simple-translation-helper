const POSITIONS = {
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left'
} as const


type Positions = typeof POSITIONS[keyof typeof POSITIONS]

const CSSPOSITION = {
    [POSITIONS.TOP_LEFT]: 'simple-top-8 simple-left-8',
    [POSITIONS.TOP_RIGHT]: 'simple-top-8 simple-right-8',
    [POSITIONS.BOTTOM_LEFT]: 'simple-bottom-8 simple-left-8',
    [POSITIONS.BOTTOM_RIGHT]: 'simple-bottom-8 simple-right-8',
} as const

type props = {
    active: boolean,
    position: Positions
}

const toggleShowTranslationKey = () => {
    const localStorageKey = 'simple-translation-show-translation-keys'
    const localStorageValue = localStorage.getItem(localStorageKey)
    let showKeyValue = false
    if (localStorageValue !== null) {
        showKeyValue = JSON.parse(localStorageValue) ?? false
    }

    localStorage.setItem(localStorageKey, JSON.stringify(!showKeyValue))
    const event = new Event('simple-translation-show-translations-update')
    dispatchEvent(event)
    console.log('set new value')
    return !showKeyValue
}

export function TranslationHub({active, position}: props) {


    if (active) {
        return (
            <div className={`simple-z-0`}>
                <div className={`simple-fixed ${CSSPOSITION[position]}`}>
                    <button
                        onClick={toggleShowTranslationKey}
                        className={'simple-inline-flex simple-justify-center simple-rounded-md simple-border simple-border-transparent simple-bg-blue-500 simple-py-2 simple-px-4 simple-text-sm simple-text-white simple-shadow-sm simple-font-sm hover:simple-text-white transition hover:simple-bg-blue-600 focus:simple-outline-none focus:simple-ring-2 focus:simple-ring-blue-500 focus:simple-ring-offset-2'}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="simple-w-6 simple-h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"/>
                        </svg>
                    </button>
                </div>
            </div>
        )
    }

}

export default TranslationHub
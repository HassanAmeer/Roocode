import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react"
import { useEffect, useState } from "react"
import { useAppTranslation } from "@/i18n/TranslationContext"
import { useDebounce } from "react-use"

import { Slider } from "@/components/ui"

interface MaxTokensControlProps {
    value: number | undefined | null
    onChange: (value: number | undefined | null) => void
    defaultValue?: number
    maxValue?: number
}

export const MaxTokensControl = ({ value, onChange, defaultValue, maxValue }: MaxTokensControlProps) => {
    const { t } = useAppTranslation()
    const [isCustom, setIsCustom] = useState(value !== undefined)
    const [inputValue, setInputValue] = useState(value)

    useDebounce(() => onChange(inputValue), 500, [onChange, inputValue])

    useEffect(() => {
        const hasCustom = value !== undefined && value !== null
        setIsCustom(hasCustom)
        setInputValue(value)
    }, [value])

    const sliderMax = Math.max(maxValue || 32768, inputValue || 0)

    return (
        <>
            <div>
                <VSCodeCheckbox
                    checked={isCustom}
                    onChange={(e: any) => {
                        const isChecked = e.target.checked
                        setIsCustom(isChecked)

                        if (!isChecked) {
                            setInputValue(null)
                        } else {
                            setInputValue(value ?? defaultValue ?? 4096)
                        }
                    }}>
                    <label className="block font-medium mb-1">{t("settings:maxTokens.label")}</label>
                </VSCodeCheckbox>
                <div className="text-sm text-vscode-descriptionForeground mt-1">
                    {t("settings:maxTokens.description")}
                </div>
            </div>

            {isCustom && (
                <div className="flex flex-col gap-3 pl-3 border-l-2 border-vscode-button-background">
                    <div>
                        <div className="flex items-center gap-2">
                            <Slider
                                min={500}
                                max={sliderMax}
                                step={128}
                                value={[inputValue ?? defaultValue ?? 4096]}
                                onValueChange={([value]) => setInputValue(value)}
                            />
                            <span className="w-16 text-right">{inputValue}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

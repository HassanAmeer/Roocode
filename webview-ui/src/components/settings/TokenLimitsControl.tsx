import React from "react"
import { useAppTranslation } from "@src/i18n/TranslationContext"
import { InfoIcon } from "lucide-react"

interface TokenLimitsControlProps {
	maxInputTokens: number | undefined | null
	maxOutputTokens: number | undefined | null
	onChangeMaxInput: (value: number | null) => void
	onChangeMaxOutput: (value: number | null) => void
	modelMaxInputTokens?: number | null
	modelMaxOutputTokens?: number | null
	modelContextWindow?: number
}

export const TokenLimitsControl: React.FC<TokenLimitsControlProps> = ({
	maxInputTokens,
	maxOutputTokens,
	onChangeMaxInput,
	onChangeMaxOutput,
	modelMaxInputTokens,
	modelMaxOutputTokens,
	modelContextWindow,
}) => {
	const { t } = useAppTranslation()

	const effectiveMaxInput = maxInputTokens ?? modelMaxInputTokens ?? undefined
	const effectiveMaxOutput = maxOutputTokens ?? modelMaxOutputTokens ?? undefined

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === "") {
			onChangeMaxInput(null)
		} else {
			const numValue = parseInt(value, 10)
			if (!isNaN(numValue) && numValue >= 0) {
				onChangeMaxInput(numValue)
			}
		}
	}

	const handleOutputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value === "") {
			onChangeMaxOutput(null)
		} else {
			const numValue = parseInt(value, 10)
			if (!isNaN(numValue) && numValue >= 0) {
				onChangeMaxOutput(numValue)
			}
		}
	}

	const resetToDefaultInputTokens = () => {
		onChangeMaxInput(null)
	}

	const resetToDefaultOutputTokens = () => {
		onChangeMaxOutput(null)
	}

	// Show this control only if the model has separate input/output limits defined
	if (!modelMaxInputTokens && !modelMaxOutputTokens) {
		return null
	}

	return (
		<div className="flex flex-col gap-3 p-3 border border-vscode-input-border rounded-md bg-vscode-input-background">
			<div className="flex items-start gap-2">
				<InfoIcon className="size-4 mt-0.5 shrink-0 text-vscode-descriptionForeground" />
				<div className="text-sm text-vscode-descriptionForeground">
					<strong>{t("settings:tokenLimits.title")}</strong>
					<p className="mt-1">{t("settings:tokenLimits.description")}</p>
					{modelContextWindow && (
						<p className="mt-1 text-xs">
							{t("settings:tokenLimits.contextWindow", {
								window: modelContextWindow.toLocaleString(),
							})}
						</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
				{/* Max Input Tokens */}
				{modelMaxInputTokens && (
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between">
							<label htmlFor="max-input-tokens" className="block font-medium text-sm">
								{t("settings:tokenLimits.maxInputTokens")}
							</label>
							{maxInputTokens !== null && maxInputTokens !== undefined && (
								<button
									type="button"
									onClick={resetToDefaultInputTokens}
									className="text-xs text-vscode-textLink-foreground hover:underline">
									{t("settings:common.reset")}
								</button>
							)}
						</div>
						<input
							id="max-input-tokens"
							type="number"
							min="0"
							max={modelMaxInputTokens ?? undefined}
							value={effectiveMaxInput ?? ""}
							onChange={handleInputChange}
							placeholder={modelMaxInputTokens?.toString() ?? ""}
							className="w-full px-3 py-1.5 bg-vscode-input-background border border-vscode-input-border rounded text-vscode-input-foreground focus:outline-none focus:border-vscode-focusBorder"
						/>
						<div className="text-xs text-vscode-descriptionForeground">
							{t("settings:tokenLimits.defaultValue")}:{" "}
							<span className="font-mono">{modelMaxInputTokens?.toLocaleString()}</span>
						</div>
					</div>
				)}

				{/* Max Output Tokens */}
				{modelMaxOutputTokens && (
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between">
							<label htmlFor="max-output-tokens" className="block font-medium text-sm">
								{t("settings:tokenLimits.maxOutputTokens")}
							</label>
							{maxOutputTokens !== null && maxOutputTokens !== undefined && (
								<button
									type="button"
									onClick={resetToDefaultOutputTokens}
									className="text-xs text-vscode-textLink-foreground hover:underline">
									{t("settings:common.reset")}
								</button>
							)}
						</div>
						<input
							id="max-output-tokens"
							type="number"
							min="0"
							max={modelMaxOutputTokens ?? undefined}
							value={effectiveMaxOutput ?? ""}
							onChange={handleOutputChange}
							placeholder={modelMaxOutputTokens?.toString() ?? ""}
							className="w-full px-3 py-1.5 bg-vscode-input-background border border-vscode-input-border rounded text-vscode-input-foreground focus:outline-none focus:border-vscode-focusBorder"
						/>
						<div className="text-xs text-vscode-descriptionForeground">
							{t("settings:tokenLimits.defaultValue")}:{" "}
							<span className="font-mono">{modelMaxOutputTokens?.toLocaleString()}</span>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

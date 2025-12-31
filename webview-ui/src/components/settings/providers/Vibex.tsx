import { type ProviderSettings, type OrganizationAllowList, vibexDefaultModelId } from "@vibex-code/types"

import type { RouterModels } from "@vibex-code/types"

import { useAppTranslation } from "@src/i18n/TranslationContext"
import { vscode } from "@src/utils/vscode"
import { Button } from "@src/components/ui"

import { ModelPicker } from "../ModelPicker"

type VibeXProps = {
	apiConfiguration: ProviderSettings
	setApiConfigurationField: (field: keyof ProviderSettings, value: ProviderSettings[keyof ProviderSettings]) => void
	routerModels?: RouterModels
	cloudIsAuthenticated: boolean
	organizationAllowList: OrganizationAllowList
	modelValidationError?: string
	simplifySettings?: boolean
}

export const Vibex = ({
	apiConfiguration,
	setApiConfigurationField,
	routerModels,
	cloudIsAuthenticated,
	organizationAllowList,
	modelValidationError,
	simplifySettings,
}: VibeXProps) => {
	const { t } = useAppTranslation()

	return (
		<>
			{cloudIsAuthenticated ? (
				<div className="flex justify-between items-center mb-2">
					<div className="text-sm text-vscode-descriptionForeground">
						{t("settings:providers.vibex.authenticatedMessage")}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<Button
						variant="primary"
						onClick={() => vscode.postMessage({ type: "vibexCloudSignIn" })}
						className="w-fit">
						{t("settings:providers.vibex.connectButton")}
					</Button>
				</div>
			)}
			<ModelPicker
				apiConfiguration={apiConfiguration}
				setApiConfigurationField={setApiConfigurationField}
				defaultModelId={vibexDefaultModelId}
				models={routerModels?.vibex ?? {}}
				modelIdKey="apiModelId"
				serviceName="Vibex Cloud"
				serviceUrl="https://vibex.com"
				organizationAllowList={organizationAllowList}
				errorMessage={modelValidationError}
				simplifySettings={simplifySettings}
			/>
		</>
	)
}

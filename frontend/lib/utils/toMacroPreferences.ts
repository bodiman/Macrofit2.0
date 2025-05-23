import { UserPreference } from '@shared/types/databaseTypes';
import { MacroPreference, MacroPreferences } from '@/tempdata';

export function toMacroPreference(userPreferences: UserPreference[]): MacroPreferences {
    // console.log("userPreferences are given by", userPreferences)
    // for (const pref of userPreferences) {
    //     console.log("pref", pref)
    // }
    return userPreferences
        .filter(pref => pref.metric && pref.metric.name) // Ensure we have valid metric data
        .map(pref => ({
            id: pref.metric.id,
            name: pref.metric.name,
            unit: pref.metric.unit,
            min: pref.min_value ?? undefined,
            max: pref.max_value ?? undefined
        }))
        // .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name
}

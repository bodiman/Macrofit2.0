export type Macros = Record<string, number>

export type MacroPreference = {
    id: string,
    name: string,
    unit: string,
    min?: number,
    max?: number
}

export type MacroPreferences = Array<MacroPreference>
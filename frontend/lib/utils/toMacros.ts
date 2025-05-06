import { MacroValue } from '@shared/types/databaseTypes';
import { Macros } from '@shared/types/macroTypes';

export function toMacros(macros: MacroValue[]): Macros {
    const macroMap: Macros = {};
    macros.forEach((macro) => {
        macroMap[macro.metric.id] = macro.value;
    });
    return macroMap;
}
import Colors from "@/styles/colors"
import { Text, View } from "react-native"
import CircularProgressBar from 'react-native-circular-progress-indicator'
import { Range, unitMap } from "@/tempdata";
// import { useState } from "react"
import { MacroKey } from "@/tempdata";

type Props = { 
    value: number, 
    range: Range, 
    radius: number,
    unit: MacroKey}

export default function MacroIndicator({ value, range, unit, radius }: Props) {

    function clip(value: number, range: Range): number {
        if (range.min && value < range.min) return range.min;
        if (range.max && value > range.max) return range.max;
        return value;
    }
    
    return (
        <View style={{pointerEvents: "none"}}>
            <CircularProgressBar 
                radius={radius}
                value={ value }
                titleColor={Colors.black}
                circleBackgroundColor={Colors.white}
                title={unit}
                activeStrokeWidth={10}
                inActiveStrokeWidth={10}
                maxValue={clip(value, range)}
                progressValueStyle={{ fontSize: 3 * radius / (3 + Math.max(String(value.toFixed() + unitMap[unit]).length, 4)) }}
                progressFormatter={(value: number) => {                    
                    return value.toFixed() + unitMap[unit]; // 2 decimal places
                }}
                strokeColorConfig={[
                    { color: '#ef4444', value: 0 },
                    { color: 'orange', value: 0.3 * clip(value, range) },
                    { color: 'yellow', value: 0.6 * clip(value, range) },
                    { color: '#22c55e', value: clip(value, range) },
                    { color: 'yellow', value: 1.10 * clip(value, range) },
                    { color: 'orange', value: 1.25 * clip(value, range) },
                    { color: '#ef4444', value: 1.5 * clip(value, range) },
                ]}
            />
        </View>
        
    )
}
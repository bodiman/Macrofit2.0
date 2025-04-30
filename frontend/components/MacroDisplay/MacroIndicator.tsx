import Colors from "@/styles/colors"
import { Text, View } from "react-native"
import CircularProgressBar from 'react-native-circular-progress-indicator'
import { Range, unitMap } from "@/tempdata";
import { useState } from "react"
import { MacroKey } from "@/tempdata";
import { useEffect } from "react";
import 'react-native-reanimated';

type Props = { 
    value: number, 
    range: Range, 
    radius: number,
    unit: MacroKey}

export default function MacroIndicator({ value, range, unit, radius }: Props) {
    const [maxValue, setMaxValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const clippedValue = clip(value, range);
        if (clippedValue == 0 && value == 0) {
            setMaxValue(1);
            setDisplayValue(1);
        } else {
            setMaxValue(clippedValue);
            setDisplayValue(value);
        }
    }, [value, range]);

    function clip(value: number, range: Range): number {
        if (range.min !== undefined && value < range.min) return range.min;
        if (range.max !== undefined && value > range.max) return range.max;
        return value;
    }

    const progressFormatter = (value: number) => {
        'worklet';
        return value.toFixed() + unitMap[unit];
    };
    
    return (
        <View style={{pointerEvents: "none"}}>
            <CircularProgressBar 
                key={maxValue}
                radius={radius}
                value={displayValue}
                maxValue={maxValue}
                titleColor={Colors.black}
                circleBackgroundColor={Colors.white}
                title={unit}
                activeStrokeWidth={10}
                inActiveStrokeWidth={10}
                progressValueStyle={{ fontSize: 3 * radius / (3 + Math.max(String(value.toFixed() + unitMap[unit]).length, 4)) }}
                progressFormatter={progressFormatter}
                strokeColorConfig={[
                    { color: '#ef4444', value: 0 * maxValue },
                    { color: 'orange', value: 0.3 * maxValue },
                    { color: 'yellow', value: 0.6 * maxValue },
                    { color: '#22c55e', value: 1 * maxValue },
                    { color: 'yellow', value: 1.10 * maxValue },
                    { color: 'orange', value: 1.25 * maxValue },
                    { color: '#ef4444', value: 1.5 * maxValue },
                ]}
            />
        </View>
    )
}
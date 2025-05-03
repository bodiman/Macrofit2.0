import Colors from "@/styles/colors"
import { Text, View } from "react-native"
import CircularProgressBar from 'react-native-circular-progress-indicator'
import { Range, unitMap } from "@/tempdata";
import { useState } from "react"
import { MacroKey } from "@/tempdata";
import React, { useEffect } from "react";
import 'react-native-reanimated';

type Props = { 
    value: number, 
    range: Range, 
    radius: number,
    unit: string,
    name: string
}

export default function MacroIndicator({ value, range, unit, radius, name }: Props) {
    const [maxValue, setMaxValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);

    // const colorConfig = React.useMemo(() => [
    //     { color: '#ef4444', value: 0 * maxValue },
    //     { color: 'orange', value: 0.3 * maxValue },
    //     { color: 'yellow', value: 0.6 * maxValue },
    //     { color: '#22c55e', value: 1 * maxValue },
    //     { color: 'yellow', value: 1.10 * maxValue },
    //     { color: 'orange', value: 1.25 * maxValue },
    //     { color: '#ef4444', value: 1.5 * maxValue },
    // ], [maxValue]);

    function getStrokeColor(value: number, max: number): string {
        const ratio = value / max;
        if (ratio <= 0.3) return '#ef4444'; // red
        if (ratio <= 0.6) return 'orange';
        if (ratio <= 1.0) return '#22c55e'; // green
        if (ratio <= 1.25) return 'orange';
        return '#ef4444'; // red again
    }
    

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
        return value.toFixed() + unit;
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
                title={name}
                activeStrokeWidth={10}
                inActiveStrokeWidth={10}
                progressValueStyle={{ fontSize: 3 * radius / (3 + Math.max(String(value.toFixed() + unit).length, 4)) }}
                progressFormatter={progressFormatter}
                activeStrokeColor={getStrokeColor(displayValue, maxValue)}

                // strokeColorConfig={colorConfig}
            />
        </View>
    )
}
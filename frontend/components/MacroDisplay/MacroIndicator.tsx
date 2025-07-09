import Colors from "@/styles/colors"
import { Text, View, Pressable, Modal, Dimensions } from "react-native"
import CircularProgressBar from 'react-native-circular-progress-indicator'
import { Range, unitMap } from "@/tempdata";
import { useState, useRef } from "react"
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

export default function MacroIndicator({ value, range, radius, unit, name }: Props) {
    const [maxValue, setMaxValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, arrowPosition: 'top' as 'top' | 'bottom', arrowLeft: 75 });
    const indicatorRef = useRef<View>(null);
    const prevValueRef = useRef<number>(0);
    const prevRangeRef = useRef<Range>(range);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
        
        // Check if values have actually changed
        const valueChanged = prevValueRef.current !== value;
        const rangeChanged = JSON.stringify(prevRangeRef.current) !== JSON.stringify(range);
        
        if (valueChanged || rangeChanged) {
            if (clippedValue === 0 && value === 0) {
                setMaxValue(1);
                setDisplayValue(1);
            } else {
                setMaxValue(clippedValue);
                setDisplayValue(value);
            }
            
            // Update refs
            prevValueRef.current = value;
            prevRangeRef.current = range;
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

    const getGoalText = () => {
        if (range.min !== undefined && range.max !== undefined) {
            return `${Math.round(range.min)}-${Math.round(range.max)}${unit}`;
        } else if (range.min !== undefined) {
            return `≥${Math.round(range.min)}${unit}`;
        } else if (range.max !== undefined) {
            return `≤${Math.round(range.max)}${unit}`;
        }
        return 'No goal set';
    };

    const handlePress = () => {
        if (indicatorRef.current) {
            indicatorRef.current.measure((fx, fy, width, height, px, py) => {
                const tooltipWidth = 150;
                const tooltipHeight = 80;
                const arrowHeight = 8;
                const margin = 10;
                
                // Calculate initial position (centered below indicator)
                let x = px + width / 2 - tooltipWidth / 2;
                let y = py + height + arrowHeight + margin;
                let arrowPosition: 'top' | 'bottom' = 'top';
                let arrowLeft = tooltipWidth / 2; // Arrow position relative to tooltip (centered)
                
                // Check horizontal boundaries
                if (x < margin) {
                    arrowLeft = px + width / 2 - margin; // Adjust arrow to point to indicator
                    x = margin;
                } else if (x + tooltipWidth > screenWidth - margin) {
                    arrowLeft = px + width / 2 - (screenWidth - margin - tooltipWidth); // Adjust arrow to point to indicator
                    x = screenWidth - tooltipWidth - margin;
                }
                
                // Check vertical boundaries
                if (y + tooltipHeight > screenHeight - margin) {
                    // Tooltip would go below screen, position it above the indicator
                    y = py - tooltipHeight - arrowHeight - margin;
                    arrowPosition = 'bottom';
                }
                
                setTooltipPosition({ x, y, arrowPosition, arrowLeft });
                setShowTooltip(true);
            });
        }
    };

    const closeTooltip = () => {
        setShowTooltip(false);
    };
    
    return (
        <>
            <Pressable 
                style={{pointerEvents: "auto"}}
                onPress={handlePress}
                ref={indicatorRef}
            >
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
            </Pressable>

            <Modal
                visible={showTooltip}
                transparent={true}
                animationType="fade"
                onRequestClose={closeTooltip}
            >
                <Pressable 
                    style={styles.modalOverlay}
                    onPress={closeTooltip}
                >
                    <View 
                        style={[
                            styles.tooltip,
                            {
                                left: tooltipPosition.x,
                                top: tooltipPosition.y
                            }
                        ]}
                    >
                        <View style={[
                            styles.tooltipArrow,
                            tooltipPosition.arrowPosition === 'bottom' && styles.tooltipArrowBottom,
                            {
                                left: tooltipPosition.arrowLeft,
                                marginLeft: -8,
                            }
                        ]} />
                        <View style={styles.tooltipContent}>
                            <Text style={styles.tooltipTitle}>{name}</Text>
                            <Text style={styles.tooltipGoal}>Goal: {getGoalText()}</Text>
                            <Text style={styles.tooltipCurrent}>Current: {value.toFixed(1)}{unit}</Text>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = {
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    tooltip: {
        position: 'absolute' as const,
        backgroundColor: Colors.white,
        borderRadius: 8,
        padding: 12,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 150,
    },
    tooltipArrow: {
        position: 'absolute' as const,
        top: -8,
        left: '50%' as any,
        marginLeft: -8,
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid' as const,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Colors.white,
    },
    tooltipArrowBottom: {
        top: 'auto' as any,
        bottom: -8,
        borderBottomWidth: 0,
        borderTopWidth: 8,
        borderBottomColor: 'transparent',
        borderTopColor: Colors.white,
    },
    tooltipContent: {
        gap: 4,
    },
    tooltipTitle: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: Colors.black,
    },
    tooltipGoal: {
        fontSize: 12,
        color: Colors.gray,
    },
    tooltipCurrent: {
        fontSize: 12,
        color: Colors.blue,
        fontWeight: '500' as const,
    },
};
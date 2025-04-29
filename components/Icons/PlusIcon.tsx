import React from 'react';
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import Colors from '@/styles/colors';

interface PlusIconProps {
    backgroundColor?: string;
}

const PlusIcon = React.memo(({ backgroundColor = Colors.black }: PlusIconProps) => (
    <Svg width="24" height="24" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill={backgroundColor} />
        <SVGText
            x="50"
            y="53"
            fontSize="90"
            fontWeight="bold"
            fill={Colors.white}
            textAnchor="middle"
            alignmentBaseline="middle"
        >
            +
        </SVGText>
    </Svg>
));

export default PlusIcon; 
import { Animated, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PropsWithChildren, useEffect, useRef } from 'react';

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
    zIndex?: number;
}>;

export default function AnimatedModal({ isVisible, onClose, children, zIndex = 100 }: Props) {
    const slideAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isVisible) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    return (
            <Animated.View 
                style={[
                    styles.modalOverlay,
                    {
                        opacity: slideAnim,
                        zIndex,
                    }
                ]}
            >
                    <Animated.View 
                        style={[
                            styles.modalContent,
                            {
                                transform: [{
                                    translateY: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1000, 0]
                                    })
                                }]
                            }
                        ]}
                    >
                        {children}
                    </Animated.View>
            </Animated.View>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
}); 
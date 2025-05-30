import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { UserMealPreference, MealMacroGoal } from '@shared/types/databaseTypes';
import Colors from '@/styles/colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { TimePicker } from 'antd'
// import TimePicker from 'react-time-picker';
// import 'react-time-picker/dist/TimePicker.css';
// import 'react-clock/dist/Clock.css';
import DatePicker from "react-multi-date-picker";
import TimePickerIcon from "react-multi-date-picker/plugins/time_picker";
// For react-multi-date-picker basic styling. You might need to adjust path or choose a different theme.
// Option 1: Default theme
import "react-multi-date-picker/styles/colors/green.css"; // Example color theme
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"; // Example background theme for calendar (though we hide day picker)
// Option 2: Or create/use a custom theme if needed
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

// Type for the data submitted by the modal
// Includes new fields, macroGoals is an array of { metric_id, target_percentage }
export type MealPreferenceSubmitData = {
    name: string;
    default_time: string;
    distribution_percentage?: number | null;
    macroGoals?: Array<{ metric_id: string; target_percentage: number }>;
};

type AddEditMealPreferenceModalProps = {
    visible: boolean;
    onClose: () => void;
    // Use the more specific submit data type
    onSubmit: (data: MealPreferenceSubmitData) => void; 
    initialData?: UserMealPreference | null;
};

// Helper to parse HH:MM string to a Date object for the picker
const parseTimeToDate = (timeStr: string): Date => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    if (!isNaN(hours) && !isNaN(minutes)) {
        date.setHours(hours, minutes, 0, 0);
    }
    return date;
};

// Helper to format Date object to HH:MM string
const formatDateToTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Helper to format Dayjs object to HH:MM string (for AntD TimePicker)
const formatDayjsToTime = (time: dayjs.Dayjs): string => {
    return time.format('HH:mm');
};

// Helper to parse HH:MM string to a Dayjs object (for AntD TimePicker)
const parseTimeToDayjs = (timeStr: string): dayjs.Dayjs | null => {
    return dayjs(timeStr, 'HH:mm');
};

const AddEditMealPreferenceModal: React.FC<AddEditMealPreferenceModalProps> = ({
    visible,
    onClose,
    onSubmit,
    initialData,
}) => {
    const [name, setName] = useState('');
    const [defaultTime, setDefaultTime] = useState('08:00');
    // State for distribution_percentage (as string for input, number for submission)
    const [distributionPercentage, setDistributionPercentage] = useState(''); 
    const [timePickerDate, setTimePickerDate] = useState(parseTimeToDate('08:00'));
    const [showTimePicker, setShowTimePicker] = useState(false);

    const modalContentRef = useRef<View>(null);

    // Log at the start of the render function
    console.log(
        `[Render] AddEditMealPreferenceModal - visible: ${visible}, Platform.OS: ${Platform.OS}, showTimePicker: ${showTimePicker}, initialData exists: ${!!initialData}`
    );

    useEffect(() => {
        if (visible) {
            console.log('Modal became visible. InitialData:', initialData);
            if (initialData) {
                setName(initialData.name);
                const initialDefaultTime = initialData.default_time || '08:00';
                setDefaultTime(initialDefaultTime);
                setTimePickerDate(parseTimeToDate(initialDefaultTime));
                // Initialize distributionPercentage from initialData
                setDistributionPercentage(
                    initialData.distribution_percentage !== null && initialData.distribution_percentage !== undefined 
                        ? (initialData.distribution_percentage * 100).toString() // Display as percentage string e.g. "20"
                        : '' 
                );
                // TODO: Initialize macroGoals UI when we add it
            } else {
                // Reset to defaults for a new entry
                setName('');
                const initialDefaultTime = '08:00';
                setDefaultTime(initialDefaultTime);
                setTimePickerDate(parseTimeToDate(initialDefaultTime));
                setDistributionPercentage(''); // Reset for new entry
                // TODO: Reset macroGoals UI
            }
            setShowTimePicker(false); 
        } else {
            console.log('Modal became hidden.');
        }
    }, [initialData, visible]);

    // Handler for Native DateTimePicker
    const handleNativeTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        console.log(`Native DateTimePicker onChange event (Platform: ${Platform.OS}):`, event.type, "selectedDate:", selectedDate);
        
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }

        if (event.type === 'set' && selectedDate) { 
            setTimePickerDate(selectedDate);
            setDefaultTime(formatDateToTime(selectedDate));
        } else if (event.type === 'dismissed') {
            // Handle dismissal if needed
        }
    };

    // Handler for Ant Design TimePicker
    const handleAntdTimeChange = (time: dayjs.Dayjs | null, timeString: string | string[]) => {
        console.log(`Ant Design TimePicker onChange:`, time, timeString);
        const formattedTimeString = Array.isArray(timeString) ? timeString[0] : timeString;
        if (time) {
            setDefaultTime(formatDayjsToTime(time));
        } else {
            setDefaultTime(''); 
        }
    };

    const handleSubmit = () => {
        console.log("handleSubmit")
        if (!name.trim() || !defaultTime.match(/^([01]\d|2[0-3]):([0-5]\d)$/)) {
            console.log("time", defaultTime)
            return;
        }
        // console.log("name", name)

        let distPercentNum: number | null | undefined = undefined;
        if (distributionPercentage.trim() !== '') {
            console.log("distributionPercentage", distributionPercentage)
            const parsedNum = parseFloat(distributionPercentage);
            if (isNaN(parsedNum) || parsedNum < 0 || parsedNum > 100) {
                console.log("parsedNum", parsedNum)
                return;
            }
            distPercentNum = parsedNum / 100; // Convert to decimal for submission (e.g., 0.20)
        } else {
            distPercentNum = null; // Explicitly set to null if blank, backend expects Float?
        }

        // TODO: Collect macroGoals data when UI is implemented
        const dataToSubmit: MealPreferenceSubmitData = {
            name: name.trim(),
            default_time: defaultTime,
            distribution_percentage: distPercentNum,
            // macroGoals: [], // Placeholder
        };

        onSubmit(dataToSubmit);
        onClose();
    };

    const handleOpenTimePicker = () => {
        console.log('TouchableOpacity to open time picker pressed. Setting showTimePicker to true.');
        setShowTimePicker(true);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent} ref={modalContentRef}>
                    <Text style={styles.modalTitle}>
                        {initialData ? 'Edit Meal Preference' : 'Add Meal Preference'}
                    </Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Meal Name (e.g., Breakfast)"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Time Input Section */}
                    {Platform.OS === 'web' ? (
                        <View style={styles.webTimePickerWrapper}>
                            <TimePicker
                                value={defaultTime ? parseTimeToDayjs(defaultTime) : null}
                                onChange={handleAntdTimeChange}
                                format="HH:mm"
                                style={{ width: '100%' }} // Ensure picker takes full width of its wrapper
                                getPopupContainer={() => modalContentRef.current as unknown as HTMLElement}
                                // popupStyle={{ zIndex: 3000 }} // Optionally, ensure popup zIndex is very high
                            />
                        </View>
                    ) : (
                        // Native (iOS, Android) Time Input
                        <TouchableOpacity onPress={handleOpenTimePicker} style={styles.timeInputTouchable}>
                            <Text style={styles.timeInputText}>{defaultTime || 'Select Time'}</Text>
                        </TouchableOpacity>
                    )}
                    
                    {/* Distribution Percentage Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nutrient Distribution % (e.g., 20 for 20%)"
                        value={distributionPercentage}
                        onChangeText={setDistributionPercentage}
                        keyboardType="numeric"
                    />
                    
                    {/* Conditionally render DateTimePicker for native platforms if showTimePicker is true */}
                    {(() => {
                        if (Platform.OS !== 'web' && showTimePicker) {
                            console.log('[Render] Conditions met for rendering DateTimePicker. Platform:', Platform.OS, 'showTimePicker:', showTimePicker);
                            return (
                                <View style={Platform.OS === 'ios' ? styles.iosPickerWrapper : {}}>
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={timePickerDate}
                                        mode={"time"}
                                        is24Hour={false}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
                                        onChange={handleNativeTimeChange}
                                        style={Platform.OS === 'ios' ? styles.iosPickerStyle : {}}
                                    />
                                </View>
                            );
                        }
                        return null; // Explicitly return null if conditions are not met
                    })()}

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        // Ensure modal container itself does not inadvertently trap focus or events meant for popups
    },
    modalContent: {
        width: '85%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'stretch',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // The ref for getPopupContainer will point here if you attach it to this View
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.calblue, 
    },
    input: {
        height: 45,
        borderColor: Colors.lightgray,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: Colors.white,
    },
    timeInputTouchable: {
        height: 45,
        borderColor: Colors.lightgray,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    timeInputText: {
        fontSize: 16,
        color: Colors.black, // Or your desired text color
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 15,
        minWidth: 100,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: Colors.coolgray, 
    },
    saveButton: {
        backgroundColor: Colors.orange, 
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '600',
        fontSize: 16,
    },
    iosPickerWrapper: {
        // This view will attempt to constrain the iOS spinner picker
        // It's hard to control the spinner's width directly, so we clip it.
        width: '100%', // Take full width of its parent within modalContent
        alignItems: 'center', // Center the picker if it's narrower than the wrapper
        overflow: 'hidden', 
        backgroundColor: 'lightblue', // For debugging the wrapper's area
        marginBottom: 15, // Match other input's margin
    },
    iosPickerStyle: {
        // Style for the picker itself, if any specific styling is needed beyond the wrapper
        // For iOS spinner, explicit width here is often ignored or problematic
        // Height is important for the spinner's visibility
        height: 216,
    },
    webTimePickerWrapper: {
        height: 45,
        // borderColor: Colors.lightgray, // DatePicker might have its own border
        // borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        justifyContent: 'center', // Vertically center the picker
        // zIndex: 2000, // zIndex on wrapper may not be needed if getPopupContainer is used effectively
    },
    // webDatePickerInput: { // This style object cannot be passed directly to inputClass
    //     height: '100% !important',
    //     width: '100% !important',
    //     border: `1px solid ${Colors.lightgray}`,
    //     borderRadius: '5px !important',
    //     paddingHorizontal: '10px !important',
    //     fontSize: '16px !important',
    //     backgroundColor: `${Colors.white} !important`,
    //     boxSizing: 'border-box', 
    // }
    /* 
    To style the input field of react-multi-date-picker like your other inputs,
    you would typically add a global CSS rule in a .css file that is imported 
    at the root of your web application (e.g., App.tsx or index.js for web).

    Example (in a global app.css or similar):
    .custom-time-picker-input .rmdp-input {
        height: 45px !important; 
        width: 100% !important; 
        border: 1px solid #cccccc !important; // Use your Colors.lightgray hex value
        border-radius: 5px !important;
        padding: 0 10px !important;
        font-size: 16px !important;
        background-color: #ffffff !important; // Use your Colors.white hex value
        box-sizing: border-box !important;
    }

    .custom-time-picker-input .rmdp-input:focus {
        outline: none !important; // Optional: remove focus outline or style it
        border-color: #007bff !important; // Optional: focus border color
    }
    */
});

export default AddEditMealPreferenceModal; 
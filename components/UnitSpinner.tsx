import DropdownMenu from './DropdownMenu'
import { MenuOption } from './MenuOption';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import Colors from '@/styles/colors';

export default function UnitSpinner() {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <DropdownMenu
                visible={visible}
                handleOpen={() => setVisible(true)}
                handleClose={() => setVisible(false)}
                trigger={
                    <View style={styles.triggerStyle}>
                        <Text style={styles.triggerText}>OZ</Text>
                    </View>
                }
            >
                <MenuOption onSelect={() => { 
                    setVisible(false);
                }}>
                    <Text>View Details</Text>
                </MenuOption>
            </DropdownMenu>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'red',
      },
      triggerStyle: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
      },
      triggerText: {
        fontSize: 16,
      }
})
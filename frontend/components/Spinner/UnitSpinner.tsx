import DropdownMenu from './DropdownMenu'
import { MenuOption } from './MenuOption';
import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';
import Colors from '@/styles/colors';
import { FlatList } from 'react-native-gesture-handler';
import { FoodServing, Unit } from '@/tempdata';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    foodItem: FoodServing
    unit: Unit,
    setUnit: (str: Unit)=> void
}

export default function UnitSpinner({ foodItem , unit, setUnit}: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={styles.container}>
            <DropdownMenu
                visible={visible}
                handleOpen={() => setVisible(true)}
                handleClose={() => setVisible(false)}
                trigger={
                    <View style={styles.triggerStyle}>
                        <Text style={styles.triggerText}>{unit.name}</Text>
                    </View>
                }
            >
                <FlatList
                    data={foodItem.servingUnits}
                    keyExtractor={(item)=> uuidv4()}
                    renderItem={({ item }: { item: Unit }) => (
                        <MenuOption onSelect={() => {
                            setVisible(false)
                            setUnit(item)
                        }}>
                            <Text style={styles.optionText}>{item.name}</Text>
                        </MenuOption>
                    )}
                />
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
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
      },
      triggerText: {
        fontSize: 16,
      },
      optionText: {
        fontSize: 16,
      }
})
import { Food, Macros, Portion } from "@/tempdata";
import { Text, View, StyleSheet, Pressable } from "react-native";
import Colors from "@/styles/colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Svg, Circle, Text as SVGText } from 'react-native-svg';
import React from 'react'

const MyIcon = React.memo(() => (
    <Svg width="24" height="24" viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="40" fill={Colors.orange} />
      <SVGText
        x="29"
        y="52"
        fontSize="90"
        fontWeight="bold"
        fill={Colors.white}
        textAnchor="middle"
        alignmentBaseline="middle"
        transform="scale(1.75, 1)"
      >
        -
      </SVGText>
    </Svg>
  ));

export default function TableRow({ name, portion, macros }: { name: string, portion: Portion, macros: Macros}) {
    const handleDeleteFood = ()=> {
        alert("Shut the fuck up")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.tableName}>
                { name } 
                <View><Text style={styles.portion}>{ portion.quantity } { portion.unit.name }</Text></View>
            </Text>
            <Text style={styles.tableDatum}>
                { macros.calories }
            </Text>
            <Pressable style={styles.deleteIcon} onPress={handleDeleteFood}>
                <MyIcon></MyIcon>
                {/* <FontAwesome name="minus-circle" size={24} color={Colors.orange} /> */}
                {/* <Text>-</Text> */}
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingHorizontal: 20,
        height: "auto",
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        borderTopColor: Colors.darkgray,
        borderTopWidth: 1,
        backgroundColor: Colors.white,
    },
    tableName: {
        flex: 1,
        fontSize: 18,
        display: "flex",
        flexDirection: "column"
    },
    tableDatum: {
        fontSize: 18,
        paddingHorizontal: 50
    },
    deleteIcon: {

    },
    portion: {
        color: Colors.gray,
        fontSize: 12,
    }
})
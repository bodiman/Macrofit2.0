import { TouchableOpacity, StyleSheet } from 'react-native';
import { ReactNode } from 'react';

export const MenuOption = ({
  onSelect,
  children,
}: {
  onSelect: () => void;
  children: ReactNode;
}) => {
  return (
    <TouchableOpacity onPress={onSelect} style={styles.menuOption}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    menuOption: {
        // backgroundColor: "red",
        padding: 10,
    }
});
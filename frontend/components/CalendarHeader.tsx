import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import Colors from '@/styles/colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const WEEKDAYS = [
  { label: 'M', index: 1 }, // Monday
  { label: 'T', index: 2 },
  { label: 'W', index: 3 },
  { label: 'T', index: 4 },
  { label: 'F', index: 5 },
  { label: 'S', index: 6 },
  { label: 'S', index: 7 },
];

function getMonday(date: Date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - ((day === 0 ? 7 : day) - 1);
  d.setDate(diff);
  d.setHours(0,0,0,0);
  return d;
}

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  d.setHours(0,0,0,0);
  return d;
}

function getWeekStartDates(centerDate: Date, numWeeks: number) {
  // Returns an array of Monday dates for numWeeks before and after centerDate
  const weeks: Date[] = [];
  const baseMonday = getMonday(centerDate);
  const startIdx = -Math.floor(numWeeks / 2);
  for (let i = startIdx; i < startIdx + numWeeks; i++) {
    weeks.push(addDays(baseMonday, i * 7));
  }
  return weeks;
}

export default function CalendarHeader({ selectedDate, onSelectDate }: {
  selectedDate: Date,
  onSelectDate: (date: Date) => void
}) {
  const NUM_WEEKS = 15; // Show 15 weeks for smooth scrolling
  const weekStartDates = getWeekStartDates(selectedDate, NUM_WEEKS);
  const flatListRef = useRef<FlatList>(null);

  // Find the index of the week containing the selected date
  const selectedWeekIdx = weekStartDates.findIndex(monday => {
    const weekStart = monday.getTime();
    const weekEnd = addDays(monday, 4).getTime();
    return selectedDate.getTime() >= weekStart && selectedDate.getTime() <= weekEnd;
  });

  // Format selected date as 'Monday, 20 May'
  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: 'long', day: 'numeric', month: 'short'
  });

  // Scroll to selected week on mount/update
  React.useEffect(() => {
    if (flatListRef.current && selectedWeekIdx >= 0) {
      flatListRef.current.scrollToIndex({ index: selectedWeekIdx, animated: true });
    }
  }, [selectedWeekIdx]);

  return (
    <View style={styles.container}>
      <View style={styles.selectedDateRow}>
        <MaterialIcons name="calendar-today" size={20} color={Colors.blue} style={{marginRight: 8}} />
        <Text style={styles.selectedDateText}>{formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={weekStartDates}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={date => date.toISOString()}
        getItemLayout={(_, index) => ({ length: Dimensions.get('window').width, offset: Dimensions.get('window').width * index, index })}
        initialScrollIndex={selectedWeekIdx}
        renderItem={({ item: monday }) => (
          <View style={styles.weekRow}>
            {WEEKDAYS.map((wd, i) => {
              const date = addDays(monday, i);
              const isSelected =
                date.getFullYear() === selectedDate.getFullYear() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getDate() === selectedDate.getDate();
              return (
                <Pressable
                  key={i}
                  style={[styles.dayContainer, isSelected && styles.daySelected]}
                  onPress={() => onSelectDate(date)}
                >
                  <Text style={[styles.dayLabel, isSelected && styles.dayLabelSelected]}>{wd.label}</Text>
                  <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected]}>{date.getDate()}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.coolgray,
  },
  selectedDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    gap: 8,
  },
  selectedDateText: {
    color: Colors.blue,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    paddingVertical: 2,
    gap: 0,
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.coolgray,
  },
  daySelected: {
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
  },
  dayLabel: {
    color: Colors.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  dayLabelSelected: {
    color: Colors.white,
  },
  dayNumber: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  dayNumberSelected: {
    color: Colors.white,
  },
}); 
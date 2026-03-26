import React, { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ListRenderItemInfo,
} from 'react-native';
import { FilterDefinition } from '../filters/FilterDefinition';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';

const { width: SCREEN_W } = Dimensions.get('window');
const ITEM_SIZE = 64;
const ITEM_MARGIN = 8;

interface FilterCarouselProps {
  filters: FilterDefinition[];
  activeIndex: number;
  onChange: (index: number) => void;
}

export const FilterCarousel: React.FC<FilterCarouselProps> = ({
  filters: filterList,
  activeIndex,
  onChange,
}) => {
  const flatListRef = useRef<FlatList>(null);

  const renderItem = ({ item, index }: ListRenderItemInfo<FilterDefinition>) => {
    const isActive = index === activeIndex;
    return (
      <TouchableOpacity
        onPress={() => {
          onChange(index);
          flatListRef.current?.scrollToIndex({
            index,
            animated: true,
            viewPosition: 0.5,
          });
        }}
        activeOpacity={0.7}
      >
        <View style={[styles.item, isActive && styles.itemActive]}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>
        {isActive && (
          <Text style={styles.filterName}>{item.name}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filterList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        getItemLayout={(_, index) => ({
          length: ITEM_SIZE + ITEM_MARGIN * 2,
          offset: (ITEM_SIZE + ITEM_MARGIN * 2) * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
  },
  list: {
    paddingHorizontal: (SCREEN_W - ITEM_SIZE) / 2 - ITEM_MARGIN,
    alignItems: 'center',
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: ITEM_SIZE / 2,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ITEM_MARGIN,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  itemActive: {
    borderColor: colors.white,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    transform: [{ scale: 1.15 }],
  },
  emoji: {
    fontSize: 30,
  },
  filterName: {
    ...typography.filterName,
    marginTop: 4,
    textAlign: 'center',
  },
});

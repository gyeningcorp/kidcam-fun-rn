import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FaceData, FilterDefinition } from '../filters/FilterDefinition';

interface FilterOverlayProps {
  face: FaceData | null;
  filter: FilterDefinition;
}

export const FilterOverlay: React.FC<FilterOverlayProps> = ({ face, filter }) => {
  if (!face) return null;

  const Renderer = filter.renderer;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Renderer face={face} mirrored />
    </View>
  );
};

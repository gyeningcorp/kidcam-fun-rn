import { ComponentType } from 'react';

export interface FaceLandmark {
  x: number;
  y: number;
}

export interface FaceData {
  bounds: {
    origin: { x: number; y: number };
    size: { width: number; height: number };
  };
  leftEyePosition?: FaceLandmark;
  rightEyePosition?: FaceLandmark;
  noseBasePosition?: FaceLandmark;
  bottomMouthPosition?: FaceLandmark;
  leftCheekPosition?: FaceLandmark;
  rightCheekPosition?: FaceLandmark;
  leftEarPosition?: FaceLandmark;
  rightEarPosition?: FaceLandmark;
  smilingProbability?: number;
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
  rollAngle?: number;
  yawAngle?: number;
}

export interface FilterRendererProps {
  face: FaceData;
  mirrored?: boolean;
}

export interface FilterDefinition {
  id: string;
  name: string;
  emoji: string;
  category: FilterCategory;
  renderer: ComponentType<FilterRendererProps>;
}

export type FilterCategory = 'animals' | 'magic' | 'silly' | 'seasonal';

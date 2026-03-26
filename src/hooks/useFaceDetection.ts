import { useState, useCallback, useRef } from 'react';
import { FaceData } from '../filters/FilterDefinition';

export function useFaceDetection() {
  const [face, setFace] = useState<FaceData | null>(null);
  const [isSmiling, setIsSmiling] = useState(false);
  const smileTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFacesDetected = useCallback(({ faces }: { faces: any[] }) => {
    if (faces.length > 0) {
      const detected = faces[0];
      const faceData: FaceData = {
        bounds: detected.bounds,
        leftEyePosition: detected.leftEyePosition,
        rightEyePosition: detected.rightEyePosition,
        noseBasePosition: detected.noseBasePosition,
        bottomMouthPosition: detected.bottomMouthPosition,
        leftCheekPosition: detected.leftCheekPosition,
        rightCheekPosition: detected.rightCheekPosition,
        leftEarPosition: detected.leftEarPosition,
        rightEarPosition: detected.rightEarPosition,
        smilingProbability: detected.smilingProbability,
        leftEyeOpenProbability: detected.leftEyeOpenProbability,
        rightEyeOpenProbability: detected.rightEyeOpenProbability,
        rollAngle: detected.rollAngle,
        yawAngle: detected.yawAngle,
      };
      setFace(faceData);

      // Smile detection
      if ((detected.smilingProbability ?? 0) > 0.75) {
        if (!smileTimerRef.current) {
          setIsSmiling(true);
          smileTimerRef.current = setTimeout(() => {
            setIsSmiling(false);
            smileTimerRef.current = null;
          }, 1500);
        }
      }
    } else {
      setFace(null);
      setIsSmiling(false);
    }
  }, []);

  return { face, isSmiling, handleFacesDetected };
}

import React, { useRef, useState } from 'react';
import { Animated, TouchableOpacity, PanResponder } from 'react-native';
import { EmailRow } from './EmailRow';

export default React.memo(function DraftCard(props) {
  const { onPress, deleteDraft, ...other } = props;
  const [swiped, setSwiped] = useState(false);

  function deleteSwipe() {
    if (deleteDraft) {
      deleteDraft();
    }
  }

  const animation = useRef(new Animated.Value(0)).current;
  const responder = useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,

      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        if (gestureState.dx === 0) {
          return false;
        } else {
          return true;
        }
      },

      onResponderTerminationRequest: () => false,

      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        if (gestureState.dx > 70) {
          setSwiped(true);
        }

        animation.setValue(gestureState.dx);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded

        if (gestureState.dx > 70) {
          deleteSwipe();
        }
        Animated.spring(animation, { toValue: 0, useNativeDriver: true }).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('DEAD!');
        Animated.spring(animation, { toValue: 0, useNativeDriver: true }).start();
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;

  return (
    <Animated.View {...responder.panHandlers} style={{ transform: [{ translateX: animation }] }}>
      <TouchableOpacity onPress={onPress}>
        <EmailRow {...other} swiped={swiped} />
      </TouchableOpacity>
    </Animated.View>
  );
});

declare module 'react-native-swipeable' {
    import { Component, ReactNode } from 'react';
    import {
      GestureResponderEvent,
      PanResponderGestureState,
      StyleProp,
      ViewStyle,
    } from 'react-native';
  
    interface SwipeableProps {
      leftContent?: ReactNode;
      rightContent?: ReactNode;
      leftButtons?: ReactNode[];
      rightButtons?: ReactNode[];
      onLeftActionActivate?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onLeftActionDeactivate?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onLeftActionRelease?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onRightActionActivate?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onRightActionDeactivate?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onRightActionRelease?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      leftActionActivationDistance?: number;
      rightActionActivationDistance?: number;
      style?: StyleProp<ViewStyle>;
      contentContainerStyle?: StyleProp<ViewStyle>;
      leftButtonWidth?: number;
      rightButtonWidth?: number;
      onSwipeStart?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onSwipeEnd?: (
        gestureState: PanResponderGestureState,
        event: GestureResponderEvent
      ) => void;
      onRef?: (ref: any) => void;
      
      // Add children to the props
      children?: ReactNode;
    }
  
    export default class Swipeable extends Component<SwipeableProps> {}
  }
  
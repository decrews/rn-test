import React from 'react';
import { View, Dimensions } from 'react-native';

import { getScreenSize } from '../../utils/screenSize';

export const Row = (props) => {
  let { style } = props;
  if (style) {
    style = { ...style, width: '100%', flexDirection: 'row', flexWrap: 'wrap' };
  } else {
    style = { width: '100%', flexDirection: 'row', flexWrap: 'wrap' };
  }

  return <View {...props} style={style} />;
};

export const Col = (props) => {
  const { sm, md, lg, ...remainingProps } = props;
  const screenSize = getScreenSize(Dimensions.get('window'));

  let { style } = remainingProps;

  if (screenSize === 'small' && sm) {
    if (style) {
      style = { ...style, flexBasis: `${sm}%` };
    } else {
      style = { flexBasis: `${sm}%` };
    }
  } else if (screenSize === 'medium' && md) {
    if (style) {
      style = { ...style, flexBasis: `${md}%` };
    } else {
      style = { flexBasis: `${md}%` };
    }
  } else if (screenSize === 'large' && lg) {
    if (style) {
      style = { ...style, flexBasis: `${lg}%` };
    } else {
      style = { flexBasis: `${lg}%` };
    }
  } else if (screenSize === sm) {
    if (style) {
      style = { ...style, flexBasis: '100%' };
    } else {
      style = { flexBasis: '100%' };
    }
  }

  return <View {...remainingProps} style={style} />;
};

export default { Row, Col };

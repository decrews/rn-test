import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontSizes from '../styles/FontSizes';
import colors from '../styles/colors';

export default function EmailRow({ subject, recipient, body, date, swiped, onPress }) {
  const styles = getStyles();

  if (!recipient) recipient = 'No Recipient';
  if (!subject) subject = 'No subject';

  const swipedStyle = swiped ? { backgroundColor: colors.red } : {};

  return (
    <TouchableOpacity style={{ backgroundColor: colors.white }} onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.portraitCircle, swipedStyle]}>
          <Text style={styles.portraitText}>{recipient[0]}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.recipient}>{recipient}</Text>
          <View style={styles.secondLine}>
            <Text style={styles.subject} numberOfLines={1}>
              {subject}
            </Text>
            <Text style={styles.body} numberOfLines={1}>
              {body}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = () => ({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
  portraitCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
  },
  portraitText: {
    fontSize: FontSizes.medium,
    color: colors.darkGrey,
  },
  subject: {
    fontSize: FontSizes.small,
  },
  recipient: {
    fontSize: FontSizes.small,
    fontWeight: 'bold',
  },
  secondLine: {
    marginTop: 5,
  },
  body: {
    fontSize: FontSizes.small,
    color: colors.darkGrey,
  },
  date: {},
});

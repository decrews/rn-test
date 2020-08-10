import React from 'react';
import { EmailRow } from './EmailRow';
import { View, Text, FlatList } from 'react-native';
import colors from '../styles/colors';
import FontSizes from '../styles/FontSizes';
import SvgIcon from './SvgIcon';
import FastImage from 'react-native-fast-image';

export default React.memo(function InboxCard(props) {
  const { description, 'x-emailSubject': emailSubject, broker, items } = props;
  let subject = emailSubject;
  let recipient = broker?.name;

  return (
    <View style={{ marginVertical: 10 }}>
      <EmailRow recipient={recipient} subject={subject} body={description} />
      <FlatList
        horizontal
        data={items}
        ListHeaderComponent={() => <View style={{ width: 75 }} />}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => ({ length: 150, offset: 150 * index, index })}
        renderItem={({ item, index }) => <MemorizedItem {...item} />}
      />
    </View>
  );
});

const MemorizedItem = React.memo(function Item(props) {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SvgIcon icon={'categoryOther'} size={30} color={colors.white} />
        {!!props.image && <FastImage style={styles.image} source={{ uri: props.image }} />}
      </View>
      <Text
        style={{ fontSize: FontSizes.extraSmall, color: colors.darkestGrey, marginLeft: 10, flex: 1 }}
        numberOfLines={2}>
        {props.name}
      </Text>
    </View>
  );
});

const getStyles = () => ({
  container: {
    height: 42,
    width: 180,
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    height: '100%',
    width: 42,
    backgroundColor: colors.primaryColor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 42,
    height: 42,
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.white,
  },
});

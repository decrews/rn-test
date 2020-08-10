import React, { useEffect } from 'react';
import { View, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../styles/colors';
import InboxCard from '../components/InboxCard';
import SvgIcon from '../components/SvgIcon';
import _ from 'lodash';

export default function Inbox({ navigation }) {
  const dispatch = useDispatch();
  const sifts = useSelector((store) => store.sifts);

  useEffect(() => {
    async function getSifts() {
      const WebServerApiKey = 'bdH0VGExAEIhPq0z5vwdyVuHVzWx0hcR';
      const WebServerUrl = 'https://edison-website-server.herokuapp.com/siftTestData';

      const response = await fetch(`${WebServerUrl}?apiKey=${WebServerApiKey}`);
      const siftData = await response.json();
      let { data } = siftData;

      if (data) {
        const sifts = [];
        data = data.filter((sift) => sift.domain === 'purchase');

        if (data?.length > 0) {
          for (let i = 0; i < 5; i++) {
            for (const sift of data) {
              const siftClone = _.cloneDeep(sift);
              siftClone.payload.items = [];

              if (siftClone.payload.acceptedOffer?.length > 0) {
                for (const index in siftClone.payload.acceptedOffer) {
                  const { itemOffered } = siftClone.payload.acceptedOffer[index];
                  if (itemOffered?.name) {
                    const { name, image, description } = itemOffered;
                    siftClone.payload.items.push({ name, image, description, id: `${index}` });
                  }
                }
              }

              sifts.push(siftClone);
            }
          }

          for (const index in sifts) {
            sifts[index].key = index;
          }

          if (data) {
            dispatch({ type: 'update-sifts', payload: sifts });
          }
        }
      }
    }

    getSifts();
  }, []);

  return (
    <SafeAreaView style={{ height: '100%', width: '100%' }}>
      <Header title={'Inbox'} />
      {!!sifts && sifts.length > 0 && (
        <FlatList data={sifts} renderItem={renderItem} keyExtractor={(item) => item.key} />
      )}
      {(!sifts || sifts.length == 0) && <ActivityIndicator style={{ marginTop: 20 }} size="small" />}
      <ComposeButton
        style={{ position: 'absolute', right: 30, bottom: 50 }}
        onPress={() => navigation.navigate('Compose')}
      />
    </SafeAreaView>
  );
}

const renderItem = ({ item, index }) => <InboxCard {...item.payload} />;

function ComposeButton({ style, onPress }) {
  const styles = getStyles();
  return (
    <View style={[style, styles.composeContainer]}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.composeButton}>
          <SvgIcon icon={'compose'} size={30} color={colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = () => ({
  composeContainer: {
    backgroundColor: 'white',
    shadowRadius: 4,
    borderRadius: 30,
    shadowOffset: { height: 2, width: 0 },
    shadowColor: colors.black,
    shadowOpacity: 0.3,
  },
  composeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

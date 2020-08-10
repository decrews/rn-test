import React from 'react';
import { SafeAreaView, FlatList, LayoutAnimation } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import DraftCard from '../components/DraftCard';

export default function Drafts({ navigation }) {
  const dispatch = useDispatch();
  const drafts = useSelector((state) => state.drafts);

  const deleteDraft = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch({ type: 'delete-draft', payload: id });
  };

  return (
    <SafeAreaView>
      <Header title={'Drafts'} />
      <FlatList
        data={drafts}
        contentContainerStyle={{ height: '100%' }}
        renderItem={({ item }) => (
          <DraftCard
            {...item}
            deleteDraft={() => deleteDraft(item.id)}
            onPress={() => navigation.navigate('Compose', item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
}

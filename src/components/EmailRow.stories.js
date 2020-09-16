import React from 'react';
import { storiesOf } from '@storybook/react-native';
import EmailRow from './EmailRow';
import { View, FlatList } from 'react-native';

// the action function has one argument which is the name of the action,
// this will be displayed in the actions tab in the addons panel
// action("name here")
import { action } from '@storybook/addon-actions';

// the boolean knob renders a switch which lets you toggle a value between true or false
// you call it like boolean("name here", default_value)
import { text, withKnobs } from '@storybook/addon-knobs';

const buttonStories = storiesOf('email row', module);

// lets storybook know to show the knobs addon for this story
buttonStories.addDecorator(withKnobs);

buttonStories.add('single card', () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEE' }}>
    <EmailRow recipient={text('Recipient', 'Danielle')} onPress={action('BUTTON PRESS!!!')} />
  </View>
));

buttonStories.add('list view', () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEE' }}>
    <FlatList style={{ width: '100%' }} data={[{}, {}, {}]} renderItem={({ item }) => <EmailRow />} />
  </View>
));

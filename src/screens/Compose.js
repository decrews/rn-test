import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet, TextInput, Platform, Alert } from 'react-native';
import RNDraftView from 'react-native-draftjs-editor';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';

const ControlButton = ({ text, action, isActive }) => {
  return (
    <Pressable style={[styles.controlButtonContainer]} onPress={action}>
      <Text style={{ fontWeight: 'bold', color: isActive ? '#2561e2' : '#888' }}>{text}</Text>
    </Pressable>
  );
};

const EditorToolBar = ({ activeStyles, blockType, toggleStyle, toggleBlockType }) => {
  return (
    <View style={styles.toolbarContainer}>
      <ControlButton text={'B'} isActive={activeStyles.includes('BOLD')} action={() => toggleStyle('BOLD')} />
      <ControlButton text={'I'} isActive={activeStyles.includes('ITALIC')} action={() => toggleStyle('ITALIC')} />
      <ControlButton text={'H'} isActive={blockType === 'header-one'} action={() => toggleBlockType('header-one')} />
      <ControlButton
        text={'ul'}
        isActive={blockType === 'unordered-list-item'}
        action={() => toggleBlockType('unordered-list-item')}
      />
      <ControlButton
        text={'ol'}
        isActive={blockType === 'ordered-list-item'}
        action={() => toggleBlockType('ordered-list-item')}
      />
      <ControlButton
        text={'--'}
        isActive={activeStyles.includes('STRIKETHROUGH')}
        action={() => toggleStyle('STRIKETHROUGH')}
      />
      <ControlButton text={'Red'} isActive={activeStyles.includes('red')} action={() => toggleStyle('red')} />
    </View>
  );
};

const Input = React.forwardRef((props, ref) => {
  const { label, value, onChangeText } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'grey',
        paddingVertical: 15,
      }}>
      <Text style={{ paddingHorizontal: 15 }}>{label + ':'}</Text>
      <TextInput value={value} onChangeText={onChangeText} autoCapitalize="none" style={{ flex: 1 }} ref={ref} />
    </View>
  );
});

export default function ComposeScreen({ navigation }) {
  const dispatch = useDispatch();
  const _draftRef = React.createRef();

  const [activeStyles, setActiveStyles] = useState([]);
  const [blockType, setActiveBlockType] = useState('unstyled');

  const recipient = navigation?.state?.params?.recipient;
  const subject = navigation?.state?.params?.subject;
  const body = navigation?.state?.params?.body;

  const [editorState, setEditorState] = useState(body ? body : '');
  const [toValue, setToValue] = useState(recipient ? recipient : '');
  const [subjectValue, setSubjectValue] = useState(subject ? subject : '');

  const editorLoaded = () => {
    _draftRef.current && _draftRef.current.focus();
  };

  const toggleStyle = (style) => {
    _draftRef.current && _draftRef.current.setStyle(style);
  };

  const toggleBlockType = (blockType) => {
    _draftRef.current && _draftRef.current.setBlockType(blockType);
  };

  function saveDraft() {
    // check for current id:
    const id = navigation?.state?.params?.id;

    const draft = {
      recipient: toValue,
      subject: subjectValue,
      body: editorState,
      id: id ? id : Date.now(),
    };

    dispatch({ type: 'save-draft', payload: draft });
  }

  function exit() {
    function yes() {
      saveDraft();
      navigation.goBack();
    }

    function no() {
      navigation.goBack();
    }

    Alert.alert(
      'Save draft?',
      'Did you want to save this draft?',
      [
        {
          text: 'No',
          onPress: no,
          style: 'destructive',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: yes,
        },
      ],
      { cancelable: true },
    );
  }

  useEffect(() => {
    /**
     * Get the current editor state in HTML.
     * Usually keep it in the submit or next action to get output after user has typed.
     */
    setEditorState(_draftRef.current ? _draftRef.current.getEditorState() : '');
  }, [_draftRef]);

  useEffect(() => {
    // saveDraft();
  }, [editorState, toValue, subjectValue]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header onPress={exit} buttonText={'<'} />
      <Input label={'To'} value={toValue} onChangeText={(text) => setToValue(text)} />
      <Input label={'Subject'} value={subjectValue} onChangeText={(text) => setSubjectValue(text)} />
      <View style={{ flex: 1, padding: 15 }}>
        <RNDraftView
          defaultValue={body ? body : ''}
          onEditorReady={editorLoaded}
          style={{ flex: 1 }}
          ref={_draftRef}
          onStyleChanged={setActiveStyles}
          onBlockTypeChanged={setActiveBlockType}
        />
      </View>
      <EditorToolBar
        activeStyles={activeStyles}
        blockType={blockType}
        toggleStyle={toggleStyle}
        toggleBlockType={toggleBlockType}
      />
      {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    marginTop: 36,
  },
  toolbarContainer: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    shadowRadius: 10,
    shadowOpacity: 0.2,
    margin: 10,
  },
  controlButtonContainer: {
    padding: 8,
    borderRadius: 2,
  },
});

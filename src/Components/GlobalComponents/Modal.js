import { CloseCircle } from 'iconsax-react-nativejs';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { styles } from '../../../styles';


export default function NotesModal({
  visible,
  onClose,
  note,
  setNote,
  onSave,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={style.centeredView}>
        <View style={style.modalView}>
          <View
            style={{
              flexDirection: 'row-reverse',
              width: '90%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.h2,style.modalTitle]}>أضف سبب الإلغاء</Text>
            <TouchableOpacity
              style={{ marginRight: -16, marginTop: -16 }}
              onPress={onClose}
            >
              <CloseCircle size="32" color="#424047" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.h3,style.textInput]}
            onChangeText={setNote}
            value={note}
            placeholder="اكتب السبب هنا..."
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
          />
          <View style={style.buttonContainer}>
            <TouchableOpacity
              style={[style.modalButton, style.buttonSave]}
              onPress={onSave}
            >
              <Text style={style.buttonText}>تأكيد</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const style = StyleSheet.create({

  centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },


   modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'right',
        width: '100%',
    },
    textInput: {
        width: '100%',
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
        textAlignVertical: 'top',
        textAlign: 'right',
        fontSize:15
    },

  buttonContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        width: '100%',
    },

   buttonSave: {
        backgroundColor: '#f44336c2',
    },

  buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },


    modalButton: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: '45%',
        alignItems: 'center',
    },
 
    buttonCancel: {
        backgroundColor: '#f44336',
    },
  
});
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomAlert = ({ visible, title, message, onClose, onConfirm }) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttons}>
                        {onClose && (
                            <TouchableOpacity onPress={onClose} style={styles.button}>
                                <Text style={styles.buttonText}>الغاء</Text>
                            </TouchableOpacity>
                        )}
                        {onConfirm && (
                            <TouchableOpacity onPress={onConfirm} style={styles.button}>
                                <Text style={styles.buttonText}>تأكيد</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',

    },
    alertBox: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        elevation: 5,

    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        textAlign: 'right',
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'right',

    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    button: {
        marginLeft: 10,
    },
    buttonText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default CustomAlert;

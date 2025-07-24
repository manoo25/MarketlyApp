import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { colors, styles } from '../../../styles';
import { PATHS } from '../../routes/Router';

export default function BackToSignUp() {
    const {replace}=useNavigation();
  return (
      <View
                          style={{
                            flexDirection: "row-reverse",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 20,
                            gap: 4,
                          }}
                        >
                          <Text
                            style={[
                              styles.h3,
                              {
                                color: colors.gray,
                                fontSize: 17,
                              },
                            ]}
                          >
                          
                          </Text>
                          <TouchableOpacity onPress={() => replace(PATHS.Login)}>
                            <Text
                              style={[
                                styles.h3,
                                {
                                  color: "#7B7686",
                                  fontSize: 20,
                                },
                              ]}
                            >
                              {" "}
                             العودة لتسجيل الدخول
                            </Text>
                          </TouchableOpacity>
                        </View>
  )
}

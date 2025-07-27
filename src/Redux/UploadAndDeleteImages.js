// utils/uploadUserImage.js

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { supabase } from './Supabase';
import * as ImageManipulator from 'expo-image-manipulator';

const getContentType = (uri) => {
  if (!uri) return 'application/octet-stream';
  const extension = uri.split('.').pop().toLowerCase();
  const types = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };
  return types[extension] || 'application/octet-stream';
};

export const compressImage = async (uri) => {
  const result = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: { width: 800 } }],
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
  );
  return result.uri;
};

export const uploadUserImage = async (imageUri) => {
  try {
    const compressedUri = await compressImage(imageUri);
    const ext = compressedUri.split('.').pop();
    const fileName = `${uuidv4()}.${ext}`;
    const filePath = `${fileName}`;

    const fileBase64 = await FileSystem.readAsStringAsync(compressedUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileBuffer = Buffer.from(fileBase64, 'base64');
    const contentType = getContentType(compressedUri);

    const { error } = await supabase.storage
      .from('users')
      .upload(filePath, fileBuffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.warn('❌ رفع الصورة فشل:', error.message);
      return null;
    }

    const { data } = supabase.storage.from('users').getPublicUrl(filePath);
    return data.publicUrl;
  } catch (error) {
    console.warn('❌ خطأ أثناء رفع الصورة:', error.message);
    return null;
  }
};

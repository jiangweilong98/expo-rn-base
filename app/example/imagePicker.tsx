import { useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function ImagePickerExample() {
  const [image, setImage] = useState<string | null>(null);
  const { t } = useTranslation();
  const pickerImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/*<Stack.Screen
        options={{
          title: 'Image Picker Example',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: () => (
            <Button
              onPress={() => {
                alert('right click');
              }}
              title="Update count"
            />
          ),
        }}
      />*/}
      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
          placeholder={'图片预览'}
          contentFit={'cover'}
          transition={1000}
        />
      )}
      <Button title={t('example.chooseImg')} onPress={pickerImage}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

import { StyleSheet, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';

export default function LocalesScreen() {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(() => {
    console.log('selectedLanguage', selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);
  return (
    <>
      <Stack.Screen
        options={{
          title: t('example.languagePickerExample'),
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#1c1c1c',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <View style={styles.contentContainer}>
        <Picker
          style={{ width: 150 }}
          mode="dropdown"
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}>
          <Picker.Item label={t('example.simplifiedChinese')} value="zh-CN" />
          <Picker.Item label={t('example.traditionalChinese')} value="zh-TW" />
          <Picker.Item label={t('example.English')} value="en" />
        </Picker>
        <View>
          <Text>{t('example.languagePickerExample')}</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
});

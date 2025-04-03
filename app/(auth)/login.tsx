import { useState, useMemo } from 'react';
import { View, StyleSheet, Button as Buttonrn } from 'react-native';
import { Input, Button, Text, Icon } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Stack, useRouter } from 'expo-router';
import * as userApi from '@/api/user';
import { useTranslation } from 'react-i18next';
import { useGlobalStore } from '@/store/useGlobalStore';

const createLoginSchema = (t: (key: string) => string) =>
  Yup.object().shape({
    /* email: Yup.string()
      .required(t('login.errors.email.required'))
      .email(t('login.errors.email.invalid')),
    password: Yup.string()
      .required(t('login.errors.password.required'))
      .min(8, t('login.errors.password.minLength')), */
    email: Yup.string().required(t('login.errors.email.required')),
    password: Yup.string().required(t('login.errors.password.required')),
  });

export default function LoginScreen(props: any, context: any) {
  console.log(props, '2222222222');
  console.log(context, '1111');
  const { t } = useTranslation();
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useGlobalStore();

  // 表单验证规则
  const LoginSchema = useMemo(() => createLoginSchema(t), [t]);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      // await userApi.login(values);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: t('login.title'),
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#1c1c1c',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Text h2 style={styles.title}>
        {t('login.title')}
      </Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <Input
              placeholder={t('login.input.email.placeholder')}
              leftIcon={<Icon name="email" size={20} />}
              keyboardType="email-address"
              autoCapitalize="none"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              errorMessage={touched.email && errors.email ? errors.email : undefined}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
            />

            <Input
              placeholder={t('login.input.password.placeholder')}
              leftIcon={<Icon name="lock" size={20} />}
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              errorMessage={touched.password && errors.password ? errors.password : undefined}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputStyle}
            />

            <Button
              title={t('login.button.login')}
              loading={loading}
              disabled={loading}
              onPress={handleSubmit}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
            />
            <Buttonrn title={'五十多阿萨啊'}></Buttonrn>

            <View style={styles.links}>
              <Button
                title={t('login.button.forget.password')}
                type="clear"
                titleStyle={styles.linkText}
                onPress={() => router.push('/forgot-password')}
                containerStyle={styles.linkButton}
              />
              <Button
                title={t('login.button.register')}
                type="clear"
                titleStyle={styles.linkText}
                onPress={() => router.push('/register')}
                containerStyle={styles.linkButton}
              />
            </View>

            {error && (
              <Text style={styles.errorText}>
                <Icon name="error" color="red" /> {error}
              </Text>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingTop: 60,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
    color: '#2089dc',
    fontSize: 24,
  },
  form: {
    gap: 10,
    marginTop: 40,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputStyle: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2089dc',
    height: 50,
    // borderWidth: 2,
    // borderColor: 'white',
    borderRadius: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
  links: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  linkText: {
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 15,
    alignItems: 'center',
    fontSize: 14,
  },
  linkButton: {
    marginHorizontal: 12,
    paddingVertical: 8,
  },
});

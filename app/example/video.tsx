import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { getAnything, getUUID } from '@/api/example';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { t, i18n } = useTranslation();

  const handleFetch = async () => {
    /* const response = await fetch('http://httpbin.org/uuid');
    const json = await response.json();
    console.log(json); */
    const data = await getUUID();
    console.log(data, 'data');
  };
  const handleFetch1 = async () => {
    /* const response = await fetch('http://httpbin.org/uuid');
    const json = await response.json();
    console.log(json); */
    const data = await getAnything({ name: 'jwl', data: 'sssssssss' });
    console.log(data, 'data');
  };

  return (
    <View style={styles.contentContainer}>
      <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? t('video.pause') : t('video.play')}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
      <Button title={t('Switch to Chinese')} onPress={() => i18n.changeLanguage('zh-CN')} />
      <Button title={t('Switch to English')} onPress={() => i18n.changeLanguage('en')} />
      <Button title={t('fetch')} onPress={handleFetch} />
      <Button title={t('fetch')} onPress={handleFetch1} />
    </View>
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
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});

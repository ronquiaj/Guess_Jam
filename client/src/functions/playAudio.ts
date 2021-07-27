/**
 * Function that takes in a url to play audio from, and then returns an object containing the audio
 * @param url
 */
export default function playAudio(url: string) {
  const audio = new Audio();
  audio.src = url;
  audio.play();
  return audio;
}

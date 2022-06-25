import Player from '@vimeo/player';

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(e => localStorage.setItem(STORAGE_KEY, e.seconds), 1000)
);

const currentTime = localStorage.getItem(STORAGE_KEY);

player
  .setCurrentTime(currentTime || 0)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          'The time is less than 0 or greater than the video’s duration'
        );
        break;

      default:
        // some other error occurred
        break;
    }
  });

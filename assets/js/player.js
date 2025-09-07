// Custom audio player functionality for Spotify-like UI

document.addEventListener('DOMContentLoaded', function () {

  let currentTrack = 0;
  const audio = document.getElementById('audio-player');
  const playBtn = document.getElementById('play-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const progress = document.getElementById('progress');
  const progressBar = document.getElementById('progress-bar');
  const trackTitle = document.getElementById('track-title');
  const playlist = document.getElementById('playlist');


  const currentTimeEl = document.getElementById('current-time');
  const durationEl = document.getElementById('duration');

  const getTracks = (type) => {
    const trackData = [];
    if(type == 3){
      trackData.push(
    { title: 'Day 1', src: './assets/foundation/Basics 3/Basics 3 Day 1.MP3' },
    { title: 'Day 2', src: './assets/foundation/Basics 3/Basics 3 Day 2.MP3' },
    { title: 'Day 3', src: './assets/foundation/Basics 3/Basics 3 Day 3.MP3' },
    { title: 'Day 4', src: './assets/foundation/Basics 3/Basics 3 Day 4.MP3' },
    { title: 'Day 5', src: './assets/foundation/Basics 3/Basics 3 Day 5.MP3' },
    { title: 'Day 6', src: './assets/foundation/Basics 3/Basics 3 Day 6.MP3' },
    { title: 'Day 7', src: './assets/foundation/Basics 3/Basics 3 Day 7.MP3' },
    { title: 'Day 8', src: './assets/foundation/Basics 3/Basics 3 Day 8.MP3' },
    { title: 'Day 9', src: './assets/foundation/Basics 3/Basics 3 Day 9.MP3' },
    { title: 'Day 10', src: './assets/foundation/Basics 3/Basics 3 Day 10.MP3' }
  );
    }
    else if(type == 2){
      trackData.push(
    { title: 'Day 1', src: './assets/foundation/Basics 2/Basics 2 - Day 1.mp3' },
    { title: 'Day 2', src: './assets/foundation/Basics 2/Basics 2 - Day 2.mp3' },
    { title: 'Day 3', src: './assets/foundation/Basics 2/Basics 2 - Day 3.mp3' },
    { title: 'Day 4', src: './assets/foundation/Basics 2/Basics 2 - Day 4.mp3' },
    { title: 'Day 5', src: './assets/foundation/Basics 2/Basics 2 - Day 5.mp3' },
    { title: 'Day 6', src: './assets/foundation/Basics 2/Basics 2 - Day 6.mp3' },
    { title: 'Day 7', src: './assets/foundation/Basics 2/Basics 2 - Day 7.mp3' },
    { title: 'Day 8', src: './assets/foundation/Basics 2/Basics 2 - Day 8.mp3' },
    { title: 'Day 9', src: './assets/foundation/Basics 2/Basics 2 - Day 9.mp3' },
    { title: 'Day 10', src: './assets/foundation/Basics 2/Basics 2 - Day 10.mp3' }
  );
    }
    else if (type == 1){
      trackData.push(
    { title: 'Day 1', src: './assets/foundation/Basics/Basics - Day 1.MP3' },
    { title: 'Day 2', src: './assets/foundation/Basics/Basics - Day 2.mp3' },
    { title: 'Day 3', src: './assets/foundation/Basics/Basics - Day 3.mp3' },
    { title: 'Day 4', src: './assets/foundation/Basics/Basics - Day 4.mp3' },
    { title: 'Day 5', src: './assets/foundation/Basics/Basics - Day 5.mp3' },
    { title: 'Day 6', src: './assets/foundation/Basics/Basics - Day 6.mp3' },
    { title: 'Day 7', src: './assets/foundation/Basics/Basics - Day 7.mp3' },
    { title: 'Day 8', src: './assets/foundation/Basics/Basics - Day 8.mp3' },
    { title: 'Day 9', src: './assets/foundation/Basics/Basics - Day 9.mp3' },
    { title: 'Day 10', src: './assets/foundation/Basics/Basics - Day 10.mp3' }
  );
    }
    return trackData;
  }

  // Get type from <bod;y data-type="N">
  const type = parseInt(document.body.getAttribute('data-type'), 10);
  console.log(type);
  const tracks = getTracks(type);

  function formatTime(sec) {
    if (isNaN(sec) || sec === Infinity) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function loadTrack(index) {
    audio.src = tracks[index].src;
    trackTitle.textContent = tracks[index].title;
    highlightTrack(index);
    playBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
    if (durationEl) durationEl.textContent = '0:00';
  }

  function playTrack() {
    audio.play();
  }

  function pauseTrack() {
    audio.pause();
  }

  function highlightTrack(index) {
    Array.from(playlist.children).forEach((li, i) => {
      li.classList.toggle('active', i === index);
    });
  }


  playBtn.addEventListener('click', function () {
    if (audio.paused) {
      playTrack();
    } else {
      pauseTrack();
    }
  });

  audio.addEventListener('play', function () {
    playBtn.innerHTML = '<span class="material-icons">pause</span>';
  });
  audio.addEventListener('pause', function () {
    playBtn.innerHTML = '<span class="material-icons">play_arrow</span>';
  });

  prevBtn.addEventListener('click', function () {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
  });

  nextBtn.addEventListener('click', function () {
    currentTrack = (currentTrack + 1) % tracks.length;
    loadTrack(currentTrack);
    playTrack();
  });

  audio.addEventListener('ended', function () {
    nextBtn.click();
  });


  audio.addEventListener('timeupdate', function () {
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + '%';
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('loadedmetadata', function () {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
  });

  progress.addEventListener('click', function (e) {
    const rect = progress.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
  });

  // Playlist click
  Array.from(playlist.children).forEach((li, i) => {
    li.addEventListener('click', function () {
      currentTrack = i;
      loadTrack(currentTrack);
      playTrack();
    });
  });

  // Initial load
  loadTrack(currentTrack);
});

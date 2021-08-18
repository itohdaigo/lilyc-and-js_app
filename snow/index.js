//https://github.com/VincentGarreau/particles.js/

window.addEventListener('DOMContentLoaded', (event) => {
  
// ＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃＃ここからリリックのAPIについて

const { Player, Ease } = TextAliveApp;

const player = new Player({
  app: {
    appAuthor: "Diego Itoh ",
    appName: "Basic example",
    token: "YJ4Jz2wsrM29wWrN"//ここに、開発者ページから取得したトークンを持ってくる。
  },
  mediaElement: document.querySelector("#media")
});

player.addListener({
  onAppReady,
  onTimerReady,
  onTimeUpdate,
  onThrottledTimeUpdate
});

const playBtn = document.querySelector("#play");
const jumpBtn = document.querySelector("#jump");
const pauseBtn = document.querySelector("#pause");
const rewindBtn = document.querySelector("#rewind");
const positionEl = document.querySelector("#position strong");

const artistSpan = document.querySelector("#artist span");
const songSpan = document.querySelector("#song span");
const phraseEl = document.querySelector("#container p");
const beatbarEl = document.querySelector("#beatbar");

function onAppReady(app) {
  if (!app.managed) {
    document.querySelector("#control").style.display = "block";
    playBtn.addEventListener("click", () => player.video && player.requestPlay());
    jumpBtn.addEventListener("click", () => player.video && player.requestMediaSeek(player.video.firstPhrase.startTime));
    pauseBtn.addEventListener("click", () => player.video && player.requestPause());
    rewindBtn.addEventListener("click", () => player.video && player.requestMediaSeek(0));
  }
  if (!app.songUrl) {//https://www.youtube.com/watch?v=XSLhsjepelI
    player.createFromSongUrl("https://www.youtube.com/watch?v=XSLhsjepelI");//http://www.youtube.com/watch?v=ygY2qObZv24
  }
}

function onTimerReady() {
  artistSpan.textContent = player.data.song.artist.name;
  songSpan.textContent = player.data.song.name;

  document
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));

  let p = player.video.firstPhrase;
  jumpBtn.disabled = !p;

  // set `animate` method
  while (p && p.next) {
    p.animate = animatePhrase;
    p = p.next;
  }
}

function onTimeUpdate(position) {

  // show beatbar
  const beat = player.findBeat(position);
  if (!beat) {
    return;
  }
  beatbarEl.style.width = `${Math.ceil(Ease.circIn(beat.progress(position)) * 100)}%`;
}

function onThrottledTimeUpdate(position) {
  positionEl.textContent = String(Math.floor(position));
}

function animatePhrase(now, unit) {

  // show current phrase
  if (unit.contains(now)) {
    phraseEl.textContent = unit.text;
  }
};

});//####### window.addEventListener('DOMContentLoaded', (event)


//******** ここから、クリックイベントの実装
const rippleElement = document.getElementById("content");
rippleElement.onclick = function(e) {
    // 今回のthisはボタンを意味する
    // X，Y、つまりボタンの左上の角からの距離を求める
    //（ボタンの中にdivを生成させるため）
    const X = e.pageX - this.offsetLeft;
    const Y = e.pageY - this.offsetTop;
    // divを生成する
    let rippleDiv = document.createElement("div");
    // divのデザイン
    rippleDiv.classList.add('ripple');
    // divの位置を.setAttributeで指定
    rippleDiv.setAttribute("style","top:"+Y+"px; left:"+X+"px;");
    // divをボタンに入れる
    rippleElement.appendChild(rippleDiv);
    //divを削除する(このコードは任意です)
    setTimeout(function() {
        rippleDiv.remove();
    },800);
}

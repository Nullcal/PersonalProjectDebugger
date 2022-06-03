$(function() {
  // files
  let trk = [19, 20, 21, 22, 23];
  let th = [6, 8];
  let tm = [10, 30, 40];
  let tmc = [1, 3, 4, 6];
  let typ = ["kagayaki", "nasuno", "tanigawa", "toki", "yamabiko"];
  let no = [40, 300, 400, 500];
  let noc = [1, 2, 4, 5, 7, 9];
  let dst = ["echigo-yuzawa", "fukushima", "kanazawa", "morioka", "sendai", "tokyo"];
  let crs = [7, 10, 12];

  // return random
  function randval(part) {
    return part[Math.floor(Math.random()*part.length)];
  }

  // define queue
  let index = 0;
  let queue = ["COSMOS", [
    ["_000", 1100],
    ["trk_"+randval(trk), 300],
    ["th_"+randval(th), 300],
    ["tm_"+randval(tm), 10],
    ["tmc_"+randval(tmc), 300],
    ["typ_"+randval(typ), 400],
    ["no_"+randval(no), 50],
    ["noc_"+randval(noc), 200],
    ["dst_"+randval(dst), 200],
    ["crs_"+randval(crs), 100],
    ["_002", 400],
    ["_007", 2000]
  ]];
  console.log(queue);

  function resetQueue() {
    queue = ["COSMOS", [
      ["_000", 1100],
      ["trk_"+randval(trk), 300],
      ["th_"+randval(th), 300],
      ["tm_"+randval(tm), 10],
      ["tmc_"+randval(tmc), 300],
      ["typ_"+randval(typ), 400],
      ["no_"+randval(no), 50],
      ["noc_"+randval(noc), 200],
      ["dst_"+randval(dst), 200],
      ["crs_"+randval(crs), 100],
      ["_002", 400],
      ["_007", 2000]
    ]];
  }

  // create audio element
  let audio = new Audio();

  // play event
  $("#playfiles").on("click", function() {
    index = 0;
    playaudio();
  });

  // play
  function playaudio() {
    audio.src = `src/${queue[0]}/${queue[1][index][0]}.mp3`;
    audio.addEventListener("canplaythrough", event => {
      audio.play();
    });
  }

  // catch ending
  audio.addEventListener("ended", event => {
    setTimeout(function() {
      if (index++ < queue[1].length-1) {
        playaudio();
      } else {
        index = 0;
        resetQueue();
        playaudio();
      }
    }, queue[1][index][1]*.8);
  });
});

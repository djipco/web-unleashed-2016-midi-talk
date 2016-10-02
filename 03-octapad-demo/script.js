// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", function () {

  var snap, octapad, input, player;

  // Setup Snap.svg, load Octapad's SVG image and size it to 90%
  snap = Snap(window.innerWidth, window.innerHeight);
  octapad = snap.group();
  Snap.load("images/octapad.svg", function (image) {
    octapad.append(image);
    octapad.animate({transform: "s.9,.9"}, 1000);
  });

  // Enable WebMidi and select MIDISport interface as input
  WebMidi.enable(function(err) {
    if (err) { throw new Error("WebMidi could not be enabled."); }
    input = WebMidi.getInputByName("MIDISPORT 2x2 Port A");
    setUpSamplePlayer();
  });

  // Sets up sample player
  function setUpSamplePlayer() {

    // Note number to sample mapping
    var sampleMap = {
      48: "samples/tom1.wav",         // PAD1
      45: "samples/tom2.wav",         // PAD2
      41: "samples/tom3.wav",         // PAD3
      51: "samples/crash.wav",        // PAD4
      35: "samples/kick.wav",         // PAD5
      38: "samples/snare-clap.wav",   // PAD6
      42: "samples/let-s-do-it.wav",  // PAD7
      49: "samples/hat-closed.wav"    // PAD8
    };

    // Create sample player and map output to master
    player = new Tone.MultiPlayer(sampleMap, addInputListener).toMaster();

  }

  // Add callback triggered when receiving MIDI data
  function addInputListener() {

    // Listen to MIDI 'note on' events
    input.addListener('noteon', "all", function(e) {

      // Play sound (buffer to play, delay, offset inside buffer, duration, pitch shift, gain)
      player.start(e.note.number, undefined, 0, undefined, 0, e.velocity);

      // Note number to pad mapping
      var map = { 48: 1, 45: 2, 41: 3, 51: 4, 35: 5, 38: 6, 42: 7, 49: 8 };

      // Flash pad using Snap.svg
      octapad.select("#pad" + map[e.note.number])
        .attr("fill", "white")
        .animate({fill: "black"}, 500, mina.easeout);

    });

  }

});


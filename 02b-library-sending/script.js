// Wait for DOM to be ready
addEventListener("DOMContentLoaded", function () {

  // Check if MIDI support is available
  WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
      return;
    }

    // WebMidi
    //   .getOutputByName("M-Audio Accent")
    //   .playNote("C2");

    console.log(WebMidi.outputs);

  });

});

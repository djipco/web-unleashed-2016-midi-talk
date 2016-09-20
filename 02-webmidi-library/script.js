// Wait for DOM to be ready
addEventListener("DOMContentLoaded", function () {

  // Check if MIDI support is available
  WebMidi.enable(function (err) {

    if (err) {
      console.log("WebMidi could not be enabled.", err);
      return;
    }

    // Retrieve Input object for nanoKEY2 and listen for 'note on' messages
    WebMidi
      .getInputByName("nanoKEY2 KEYBOARD")
      .addListener('noteon', "all", function(e) {
        console.log(e);
      });

  });

});

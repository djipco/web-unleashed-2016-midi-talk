// Wait for DOM to be ready
addEventListener("DOMContentLoaded", function () {

  console.log("DOM ready!");

  // Check if MIDI support is available
  if (!navigator.requestMIDIAccess) {
    console.log("MIDI is not supported by your browser.");
    return;
  }

  // Request access to the MIDI subsystem
  navigator.requestMIDIAccess().then(onSuccess, onFailure);

  // Failure handler
  function onFailure(e) {
    console.log("MIDI cannot be activated.\n\n" + e);
  }

  // Success handler
  function onSuccess(midiAccess) {

    var inputs = midiAccess.inputs.values();

    for (var input = inputs.next(); input && !input.done;
         input = inputs.next()) {

      console.log(input);

      if (input.value.name === "nanoKEY2 KEYBOARD") {
        input.value.onmidimessage = onMessage;
      }

    }

  }

  // MIDI message handler
  function onMessage(event) {

    // Extract command and channel from 1st byte
    var command = event.data[0] >> 4;
    var channel = event.data[0] & 0xF;

    // Retrieve note number and velocity
    var note = event.data[1];
    var velocity = event.data[2];

    // Log details about the message
    console.log(command, channel, note, velocity);

  }

});

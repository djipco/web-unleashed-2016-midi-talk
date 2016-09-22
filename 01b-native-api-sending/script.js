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

    var outputs = midiAccess.outputs.values();

    for (var output = outputs.next(); output && !output.done; output = outputs.next()) {

      console.log(output);

      if (output.value.name === "MIDI Monitor (Untitled)") {
        var synth = output.value;
      }

    }

    var command = 0x9;
    var channel = 1;
    var status = (command << 4) + (channel - 1)

    synth.send([status, 48, 127]); // status byte, note number, velocity

  }

});

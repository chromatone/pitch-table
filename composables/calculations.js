export function calcFreq(pitch = 0, octave = 3, root = 440, tuning = 'equal') {
  let hz = 0
  const justCents = [0, 112, 204, 316, 386, 498, 590, 702, 814, 884, 1017, 1088]
  if (tuning == 'equal') {
    hz = Number(root * Math.pow(2, octave - 4 + pitch / 12))
  }
  if (tuning == 'just') {
    let diff = Number(Math.pow(Math.pow(2, 1 / 1200), justCents[pitch]))
    hz = Number(root * Math.pow(2, octave - 4) * diff)
  }
  return hz
}

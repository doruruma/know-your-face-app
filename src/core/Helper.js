export const chipWorkstateColor = id => {
  let color
  switch (id) {
    case 1:
      color = 'primary'
      break;
    case 2:
      color = 'teal'
      break;
    case 3:
      color = 'red'
      break;
    default:
      color = 'grey'
      break;
  }
  return color
}

export const chipIsLateColor = id => {
  let color
  switch (id) {
    case 1:
      color = 'red'
      break;
    default:
      color = 'teal'
      break;
  }
  return color
}

export default { chipWorkstateColor, chipIsLateColor }
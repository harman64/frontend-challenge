export default function getIntValueOf(el) {
  // extracting translateX without unit and converting it to integer with parsInt
  return parseInt(el.replace('translateX(', '').replace('px)', ''), 10);
}

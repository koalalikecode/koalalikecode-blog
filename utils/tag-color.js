const colors = [
  "red",
  "green",
  "blue",
  "orange",
  "fuchsia",
  "amber",
  "lime",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "indigo",
  "violet",
  "purple",
  "yellow",
  "pink",
  "rose",
];

const hashTextToColor = (tagName) => {
  const colorNumber = (tagName.length * 168) % colors.length;
  return colors[colorNumber];
};

module.exports = {
  hashToTextColor(tagName) {
    return `text-${hashTextToColor(tagName)}-600`;
  },
  hashToBgColor(tagName) {
    return `bg-${hashTextToColor(tagName)}-100`;
  },
};

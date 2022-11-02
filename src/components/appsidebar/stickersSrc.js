export const stickers = [
  process.env.PUBLIC_URL + '/stickers/1.png',
  process.env.PUBLIC_URL + '/stickers/2.png',
  process.env.PUBLIC_URL + '/stickers/3.png',
  process.env.PUBLIC_URL + '/stickers/4.png',
  process.env.PUBLIC_URL + '/stickers/5.png',
];

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function range(start, end) {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

export default function getStickerNames(){
  let values = range(1,47)
  var stickerNames = []
  values.forEach((value, index) => {
    let name = process.env.PUBLIC_URL + "/stickers/" +zeroPad(value, 3) + ".png";
    stickerNames[index]={src:name, id:index, content:name};
  })

  return stickerNames
}

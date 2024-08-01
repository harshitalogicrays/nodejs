import path from 'path'
const directory = '/day2_01aug'
const file="day2_01aug.txt"

// console.log(path.join(directory,file))
// let mypath=path.resolve(directory,file)
// console.log(mypath)
// console.log(path.basename(mypath))
// console.log(path.dirname(mypath))
// console.log(path.extname(file))
// console.log(path.parse(mypath))
// console.log(path.isAbsolute(mypath))

// let data ={
//     root: 'd:\\',
//     dir: 'd:\\day2_01aug',
//     base: 'day2_01aug.txt',
//     ext: '.txt',
//     name: 'day2_01aug'
//   }
//   console.log(path.format(data))

const __dirname = path.resolve();
console.log(__dirname);

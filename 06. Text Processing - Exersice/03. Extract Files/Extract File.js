function solve(string){
  let fileNameAndExtension = string.split('\\').pop();
  let tokens = fileNameAndExtension.split('.');
  let extension = tokens.pop();
  let fileName = tokens.join('.');
  console.log(`File name: ${fileName}`);
  console.log(`File extension: ${extension}`);
}
solve('C:\\Internal\\training-internal\\Template.pptx.cs');
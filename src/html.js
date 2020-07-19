export default async function html(strings, ...expressions) {
  let fullString = '';
  for (let i = 0; i < strings.length; i++) {
    fullString += strings[i];
    const expressionValue = await expressions[i];
    fullString += expressionValue ? expressionValue : '';
  }
  return fullString;
}
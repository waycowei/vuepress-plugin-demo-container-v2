// https://github.com/element-plus/element-plus/blob/dev/website/md-loader/index.js
const {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
} = require('./util.js');
const os = require('os')

module.exports = function (content) {
  if (!content) {
    return content
  }
  const startTag = '<!--pre-render-demo:';
  const startTagLen = startTag.length;
  const endTag = ':pre-render-demo-->';
  const endTagLen = endTag.length;
  const importPair = {}

  let componenetsString = ''; // 组件引用代码
  let templateArr = []; // 模板输出内容
  let styleArr = []; // 样式输出内容
  let id = 0; // demo 的 id
  let start = 0; // 字符串开始位置
  let commentStart = content.indexOf(startTag);
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  while (commentStart !== -1 && commentEnd !== -1) {
    templateArr.push(content.slice(start, commentStart));
    const commentContent = content.slice(commentStart + startTagLen, commentEnd);
    const html = stripTemplate(commentContent);
    const script = stripScript(commentContent);
    const style = stripStyle(commentContent);
    const [demoComponentContent, tepimportPair] = genInlineComponentText(html, script); // 示例组件代码内容
    Object.assign(importPair, tepimportPair)
    const demoComponentName = `render-demo-${id}`; // 示例代码组件名称
    templateArr.push(`<template><${demoComponentName} /></template>`);
    styleArr.push(style);
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`;
    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }
  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      ${
        Object
          .keys(importPair)
          .map(key => `import * as ${key} from '${importPair[key]}';`)
          .join(os.EOL)
      }
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }
  // 合并 style 内容
  let styleString = '';
  if(styleArr && styleArr.length > 0) {
    styleString = `<style>${styleArr.join('')}</style>`
  } else {
    styleString = `<style></style>`
  }
  templateArr.push(content.slice(start));
  return {
    template: templateArr.join(''),
    script: pageScript,
    style: styleString
  }
};
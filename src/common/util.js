// https://github.com/element-plus/element-plus/blob/dev/website/md-loader/util.js
const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const os = require('os')

function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n');
}

function getPascalByPackageName (name = '') {
  return name
    // 将非字母转为 --
    .replace(/[^a-zA-Z]/g, '--')
    // 将所有重复的 - 转为单个
    .replace(/-+/g, '-')
    // 将 -字母 转为 大写字母
    .replace(/-([a-zA-Z]{1})/g, (s, s1) => s1.toUpperCase())
    // 将首字母转为大写
    .replace(/^([a-zA-Z]{1})/, (s, s1) => s1.toUpperCase())
}

function genInlineComponentText(template, script) {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  const importPair = {}
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map(e => `  - ${e}`).join('\n') +
        '\n'
    );
  }
  let demoComponentContent = `
    ${compiled.code}
  `;
  // todo: 这里采用了硬编码有待改进
  script = script.trim();
  if (script) {
    script = script
      .replace(/export\s+default/, 'const democomponentExport =')
      .replace(/import\s+(.*)\s+from\s+['"]{1}(.*)['"]{1}/g, (s, s1, s2) => {
        const name = getPascalByPackageName(s2)
        importPair[name] = s2
        if (/^\s*{.*}\s*$/.test(s1)) {
          return `const ${s1} = ${name}`
        }
        const namelist = s1.split(',')
        return namelist.map(n => {
          if (/^\s*\*\s+as\s+\S+\s*$/.test(n)) {
            return `const ${n.split(' as ')[1]} = ${name}`
          } else {
            return `const ${n} = ${name}.default ? ${name}.default : ${name}`
          }
        }).join(os.EOL)
      })
  } else {
    script = 'const democomponentExport = {}';
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
  return [demoComponentContent, importPair];
}

module.exports = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText
};
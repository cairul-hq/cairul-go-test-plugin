import { list, option, selectors, stdout, value } from '@cairul/pdk/runner';
import { goTest } from '@cairul/pdk/reports';

function depth(pattern = '') {
  let nesting = 0;
  let characterClass = false;
  let escaped = false;
  let separators = 0;
  let minimum = Number.POSITIVE_INFINITY;
  for (const character of pattern) {
    if (escaped) {
      escaped = false;
      continue;
    }
    if (character === '\\') {
      escaped = true;
      continue;
    }
    if (character === '[') characterClass = true;
    if (character === ']') characterClass = false;
    if (characterClass) continue;
    if (character === '(') nesting++;
    if (character === ')') nesting--;
    if (nesting !== 0) continue;
    if (character === '/') separators++;
    if (character === '|') {
      minimum = Math.min(minimum, separators);
      separators = 0;
    }
  }
  return Math.min(minimum, separators) + 1;
}

export default {
  command: ['go'],
  select: selectors({ packages: list, namePattern: value }),
  build({ packages = ['./...'], namePattern }) {
    return {
      args: ['test', '-json', '-count=1', ...option('-run', namePattern), ...packages],
      capture: true,
      read: stdout((source) => goTest(source, depth(namePattern))),
    };
  },
};

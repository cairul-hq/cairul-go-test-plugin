import { testRunner } from '@cairul/plugin-kit/runner';
import adapter from './run.mjs';
import { goTest, junit, testPlugin } from '@cairul/plugin-kit/reports';

const reports = testPlugin('go-test.passed', { json: goTest, junit });

export default testRunner(reports, 'go-test.run', adapter);

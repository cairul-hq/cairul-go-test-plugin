import { testRunner } from '@cairul/pdk/runner';
import adapter from './run.mjs';
import { goTest, junit, testPlugin } from '@cairul/pdk/reports';

const reports = testPlugin('go-test.passed', { json: goTest, junit });

export default testRunner(reports, 'go-test.run', adapter);

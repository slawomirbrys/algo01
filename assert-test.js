
import { assert } from './assert.js';

assert(true, `Assert should be fine, but it's not`);
assert(false, `Assert with 'false' fails and that's OK`);
assert(null, `ssert with 'null' fails and that's OK`);
assert({}, `Assert with '{}' fails and that's OK`);
assert(() => true, `This funcation assertthat returns 'true' and should not fail`);
assert(() => false, `This funcation assert returns 'false' and should fail and it's OK`);
assert(() => null, `This funcation assert returns 'null' and should fail and it's OK`);
assert(() => {}, `This funcation assert returns '{}' and should fail and it's OK`);

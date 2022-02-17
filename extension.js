const { registerCmd } = require('./util');

function activate(context) {
  registerCmd(
    context,
    'select-line-range.selectLineRange',
    require('./commands/SelectLineRange'),
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

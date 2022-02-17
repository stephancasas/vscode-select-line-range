const vscode = require('vscode');
const { delay } = require('../util');

module.exports = () => {
  let selection,
    next = true;

  const performEntry = (ranges) => {
    if (!next) return;
    // go to the start of the selection range
    vscode.commands.executeCommand(
      'editor.action.goToLocations',
      vscode.window.activeTextEditor.document.uri,
      new vscode.Position(selection[0] - 1, 0),
      ranges,
    );
    // requires delay because... reasons???
    return delay();
  };

  const performSelect = () => {
    if (!next) return;
    vscode.commands.executeCommand('cursorMove', {
      to: 'down',
      by: 'line',
      select: true,
      value: selection[1] - selection[0],
    });

    vscode.commands.executeCommand('cursorMove', {
      to: 'wrappedLineEnd',
      by: 'line',
      select: true,
      value: 1,
    });
  };

  const provideRanges = () => {
    if (!next) return;
    return vscode.commands.executeCommand(
      'vscode.executeSelectionRangeProvider',
      vscode.window.activeTextEditor.document.uri,
      [new vscode.Position(selection[0], 0)],
    );
  };

  const parseEntry = (input) => {
    if (!next) return;
    if (!input || input.match(/[a-z]/gi)) {
      next = false;
      return;
    }

    let [here, there] = input
      .split(/[\s,:-]/gi)
      .map((loc) => parseInt(loc.trim()));

    // if no destination, select from current line to `here`
    there = !there
      ? vscode.window.activeTextEditor.selection.active.line + 1
      : there;

    selection = [here, there];
    selection.sort((a, b) => a - b);
  };

  vscode.window
    .showInputBox({
      prompt: 'Enter a line or line range.',
      placeHolder: 'e.g. `13`, `13 20`, `13-20`',
      title: 'Select Line Range',
    })
    .catch(() => (next = false))
    .then(parseEntry)
    .then(provideRanges)
    .then(performEntry)
    .then(performSelect);
};

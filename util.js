const vscode = require('vscode');

const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 100));

const registerCmd = (ctx, id, fn) =>
  ctx.subscriptions.push(vscode.commands.registerCommand(id, fn));

module.exports = { delay, registerCmd };

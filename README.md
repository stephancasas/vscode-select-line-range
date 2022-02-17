# Select Line Range Extension

Use this extension to select a range of lines (e.g. `13-20`) or to select from the current line to the Nth line.

## Features

The command `select-line-range.selectLineRange` is contributed, and can be bound to a keyboard shortcut, or accessed via the command palette as `Select Line Range`.

- Line ranges can be whitespace, colon, or dash-delimited.
  - Acceptable Entries
    - `13 20`
    - `13:20`
    - `13-20`
- If a single line is entered, the cursor's current position will be used as the range starting point.

<p align="center">
   <img  src="https://raw.githubusercontent.com/stephancasas/vscode-select-line-range/master/preview/action.gif" />
</p>

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release

---

Written by [Stephan Casas](https://www.twitter.com/stephancasas)

---
tags:
  - architecture
index: "[Architecture](docs/architecture/_index.md)"
aliases:
  - Host interfaces
---
# Host interfaces

Each behaviour of the adapters layer relies on one interface of Obsidian or of CodeMirror. Each need of the plugin is listed below with its interface, and with the evidence that the interface behaves as needed. An interface marked as unverified must be tested before a module depends on that interface, as the [implementation plan](implementation-plan.md) orders.

| Need | Interface | Evidence |
| --- | --- | --- |
| Markers and highlights in the editor of a note | a CodeMirror 6 extension registered by `Plugin.registerEditorExtension`, holding decorations | [reference of the method](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/registerEditorExtension) and [guide on editor extensions](https://docs.obsidian.md/Plugins/Editor/Editor+extensions) |
| Markers and highlights in the reading view of a note | a post-processor registered by `Plugin.registerMarkdownPostProcessor` | [reference of the method](https://docs.obsidian.md/Reference/TypeScript+API/Plugin/registerMarkdownPostProcessor) |
| Bubble column and vault view | a view extending `ItemView`, registered by `Plugin.registerView` | [reference of the class](https://docs.obsidian.md/Reference/TypeScript+API/ItemView); `registerView` is used by the working code of ekphrasis |
| Markdown and LaTeX in a contribution | `MarkdownRenderer.render(app, markdown, el, sourcePath, component)` | [reference of the method](https://docs.obsidian.md/Reference/TypeScript+API/MarkdownRenderer/render) |
| Reading a record or a target | `Vault.cachedRead` and `Vault.getAbstractFileByPath` | used by the working code of ekphrasis |
| Writing a record | `Vault.create` for a new record, `Vault.process` for an atomic read, change and save | [reference of `create`](https://docs.obsidian.md/Reference/TypeScript+API/Vault/create) and [reference of `process`](https://docs.obsidian.md/Reference/TypeScript+API/Vault/process) |
| Closing an item | `FileManager.trashFile`, following the trash preference of the user | [reference of the method](https://docs.obsidian.md/Reference/TypeScript+API/FileManager/trashFile); tagged `@since 1.6.6` in the [type definitions of the API](https://github.com/obsidianmd/obsidian-api/blob/master/obsidian.d.ts) |
| Edits of a target | the event `modify` of the vault, registered by `Plugin.registerEvent` | used by the working code of ekphrasis |
| Renamed and moved targets | the event `rename` of the vault, whose callback receives the file and its former path | [reference of the event](https://docs.obsidian.md/Reference/TypeScript+API/Vault/on('rename')) |
| Commands | `Plugin.addCommand` | used by the working code of ekphrasis |
| Settings | a tab extending `PluginSettingTab`, with `Plugin.loadData` and `Plugin.saveData` | `PluginSettingTab` is used by the working code of ekphrasis |
| Display over a YAML file opened in the view of another plugin | an editor extension reaching that view | unverified: no documentation states whether an editor extension reaches the view of another plugin |

## Rules for the adapters

- An editor decoration changes the display only, so the text of a target stays untouched, as the requirement on [untouched targets](../requirements.md#^untouched-targets) demands.
- Every record must be written through the vault, so that Obsidian and the other plugins observe the change. No record may be written through the file system directly.
- The minimum version of Obsidian, declared as `minAppVersion` in the file `manifest.json`, must equal the highest `@since` tag among the interfaces used. That tag is currently 1.6.6, set by `FileManager.trashFile`.
- A view that renders Markdown must pass itself as the `component` of `MarkdownRenderer.render`, so that the rendered children are released when the view closes.

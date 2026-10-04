/**
 * Plugin class and composition root.
 *
 * The adapters layer is the only layer admitted to call the API of Obsidian. Views, commands,
 * editor decorations and the settings tab are registered from this class as they are implemented.
 */
import { Plugin } from "obsidian";

/** Diorthosis plugin, instantiated by Obsidian from the default export of the bundle. */
export default class DiorthosisPlugin extends Plugin {}

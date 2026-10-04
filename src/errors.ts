/**
 * Error hierarchy of the plugin.
 *
 * Every expected failure derives from {@link DiorthosisError}. Therefore, adapters can report domain
 * failures to the user, and propagate programming errors unchanged.
 *
 * Names are assigned explicitly (rather than through `new.target.name`) so that they survive
 * identifier mangling in minified production bundles.
 */

/** Base class of all expected failures raised by the plugin. */
export class DiorthosisError extends Error {
  override name = "DiorthosisError";
}

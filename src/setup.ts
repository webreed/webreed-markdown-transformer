// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import {Environment} from "webreed-core/lib/Environment";

import {MarkdownTransformer} from "./MarkdownTransformer";
import {PluginOptions} from "./PluginOptions";


/**
 * Setup a new instance of the plugin.
 *
 * @param env
 *   An environment that represents a webreed project.
 * @param options
 *   Additional options for configuring the plugin instnace.
 */
export default function (env: Environment, options?: PluginOptions): void {
  let instance = new MarkdownTransformer(options);

  env.transformers.set("markdown", instance);
}

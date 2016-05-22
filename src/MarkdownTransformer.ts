// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


const markdownIt = require("markdown-it");
import {Observable} from "rxjs";

import {Resource} from "webreed-core/lib/Resource";
import {Transformer} from "webreed-core/lib/plugin/Transformer";

import {PluginOptions} from "../src/PluginOptions";


/**
 * Parses the body of a markdown encoded resource using the 'markdown-it' module and
 * replaces the body of the resulting resource with the rendered HTML.
 */
export class MarkdownTransformer implements Transformer {

  private _markdownProcessor: any;

  constructor(options?: PluginOptions) {
    this._markdownProcessor = markdownIt(options);

    if (!!options && Array.isArray(options.plugins)) {
      options.plugins.map(this._markdownProcessor.use);
    }
  }

  public transform(resource: Resource, context: any): Observable<Resource> {
    if (!resource.body) {
      // There is no body of markdown content to transform!
      return Observable.of(resource);
    }

    let markdownEncodedBody = resource.body.toString();

    let outputBody = this._markdownProcessor.render(markdownEncodedBody);
    let outputResource = resource.clone({
      body: outputBody,
    });
    return Observable.of(outputResource);
  }

}

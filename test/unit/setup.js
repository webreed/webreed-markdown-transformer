// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import given from "mocha-testdata";
import should from "should";

import {Environment} from "webreed-core/lib/Environment";

import setup from "../../lib/setup";
import {MarkdownTransformer} from "../../lib/MarkdownTransformer";


describe("#setup(env, options)", function () {

  it("is a function", function () {
    setup
      .should.be.a.Function();
  });

  it("adds 'markdown' transformer to the environment", function () {
    let env = new Environment();
    setup(env);
    env.transformers.get("markdown")
      .should.be.instanceOf(MarkdownTransformer);
  });

});

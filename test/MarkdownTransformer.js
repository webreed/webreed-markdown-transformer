// Copyright (c) Rotorz Limited. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root.


import given from "mocha-testdata";
import should from "should";

import {Environment} from "webreed-core/lib/Environment";

import {MarkdownTransformer} from "../lib/MarkdownTransformer";


describe("MarkdownTransformer", function () {

  beforeEach(function () {
    this.env = new Environment();
    this.markdownTransformer = new MarkdownTransformer();
  });


  it("is named 'MarkdownTransformer'", function () {
    MarkdownTransformer.name
      .should.be.eql("MarkdownTransformer");
  });


  describe("#constructor(options)", function () {

    it("is a function", function () {
      MarkdownTransformer.prototype.constructor
        .should.be.a.Function();
    });

    it("wires up plugin", function () {
      let usedPlugin = false;

      new MarkdownTransformer({
        plugins: [
          function () { usedPlugin = true; }
        ]
      });

      usedPlugin
        .should.be.true();
    })

  });


  describe("#transform(resource, context)", function () {

    it("is a function", function () {
      this.markdownTransformer.transform
        .should.be.a.Function();
    });

    it("outputs the source resource when source resource doesn't have a 'body' property", function () {
      let sourceResource = this.env.createResource();
      return this.markdownTransformer.transform(sourceResource, {})
        .toPromise()
        .should.eventually.be.exactly(sourceResource);
    });

    it("sets 'body' property from rendered HTML", function () {
      let sourceResource = this.env.createResource({
        body: `\
# Lorem Ipsum

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
`
      });

      return this.markdownTransformer.transform(sourceResource, {})
        .toPromise()
        .should.eventually.have.properties({
          body: `\
<h1>Lorem Ipsum</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
`
        });
    });

  });

});

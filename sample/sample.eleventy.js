import assetBundler from "../dist/eleventy.js";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(assetBundler);

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist",
      data: "../_data",
      includes: "../_includes",
      layouts: "../_layouts",
    },
  };
}

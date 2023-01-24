function load_templates(template_map, prefix) {
  // template_map is an array of "span id: file path" pairs
  // console.log("Loading templates")
  for (let [span_id, html_file] of template_map) {
    // console.log("Span id is ", span_id);
    $(span_id).load(prefix + html_file);
  }
}

const templates = new Map();
templates.set("#top-menu", "templates/top-menu.html");
templates.set("#comment-area", "templates/comment-area.html");

// load this on files of the form "articles/myPost1.html"
load_templates(templates, "../");

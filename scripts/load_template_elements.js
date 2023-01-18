function load_templates(template_map) {
  // template_map is an array of "span id: file path" pairs
  // console.log("Loading templates")
  for (let [span_id, html_file] of template_map) {
    // console.log("Span id is ", span_id);
    $(span_id).load(html_file);
  }
}

const templates = new Map();
templates.set("#top-menu", "/templates/top-menu.html");
templates.set("#comment-area", "/templates/comment-area.html");

load_templates(templates);

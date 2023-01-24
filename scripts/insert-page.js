/*
Note: each element of the array is a JSON object (key-value pair)
so it needs to be enclosed in curly braces

/global_info/pages.json:
{
  section-id1: [
    {article_link(1,1): [article_title(1,1), article_description(1,1)]},
    {article_link(1,2): [article_title(1,2), article_description(1,2)]},
    ...
    {article_link(1,m_1): [article_title(1,m_1), article_description(1,m_1)]}
  ],
  ...
  section-id_n: [
    {article_link(n,1): [article_title(n,1), article_description(n,1)]},
    {article_link(n,2): [article_title(n,2), article_description(n,2)]},
    ...
    {article_link(n,m_n): [article_title(n,m_n), article_description(n,m_n)]}
  ]
}
where m_i is the number of articles of the i-th section.
*/

var SECTIONS_LOADED = false; // global flag
const SECTION_AREA_ID = "sections"; // see index.html

async function load_sections() {
  sections = await fetch("/algotopics.github.io/global_info/sections.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  for (s_id in sections) {
    s_wrapper = document.createElement("div");
    s_title = document.createElement("h3");
    s_title.innerHTML = sections[s_id];
    s_article_list = document.createElement("ul");
    s_article_list.id = s_id;

    s_wrapper.appendChild(s_title);
    s_wrapper.appendChild(s_article_list);

    document.getElementById(SECTION_AREA_ID).appendChild(s_wrapper);
  }
  SECTIONS_LOADED = true;
}

function insert_page(section_id, article_html, article_link) {
  article_list_element = document.getElementById(section_id); // ul element
  list_item = document.createElement("li");
  link = document.createElement("a");
  link.setAttribute("href", article_link);

  link.innerHTML = article_html;
  list_item.appendChild(link);
  article_list_element.appendChild(list_item);
}

async function processPageLinks(path) {
  console.assert(
    SECTIONS_LOADED == true,
    "Error: tried to load page list without creating the sections first."
  ); // confirm sections were loaded beforehand

  pages_json = await fetch(path)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data); // TODO REMOVE
      return data;
    });
  for (var section_id in pages_json) {
    for (var index in pages_json[section_id]) {
      json_wrapper = pages_json[section_id][index];
      for (var article_link in json_wrapper) {
        article_title_html = json_wrapper[article_link][0];
        article_description_html = json_wrapper[article_link][1];
        //console.log("Link is ", article_link);
        //console.log("Title html is ", article_html); // TODO REMOVE
        insert_page(section_id, article_title_html, article_link);
      }
    }
  }
}

async function main() {
  await load_sections();
  await processPageLinks("/algotopics.github.io/global_info/pages.json");
}

main();

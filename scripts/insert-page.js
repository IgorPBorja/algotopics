/*
Note: each element of the array is a JSON object (key-value pair)
so it needs to be enclosed in curly braces

/global_info/pages.json:
{
  section-id1: [
    {article_link(1,1): article(1,1)},
    {article_link(1,2): article(1,2)},
    ...
    {article_link(1,m_1): article(1,m_1)}
  ],
  ...
  section-id_n: [
    {article_link(n,1): article(n,1)},
    {article_link(n,2): article(n,2)},
    ...
    {article_link(n,m_n): article(n, m_n)}
  ]
}
*/

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
        article_html = json_wrapper[article_link];
        //console.log("Link is ", article_link);
        //console.log("Title html is ", article_html); // TODO REMOVE
        insert_page(section_id, article_html, article_link);
      }
    }
  }
}

processPageLinks("./global_info/pages.json");

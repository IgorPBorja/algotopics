const MAX_DISPLAYED_COMMENTS = 20

function generateCommentObject(comment_JSON) {
  const email = comment_JSON["email"];
  const timestamp = comment_JSON["timestamp"];
  const content = comment_JSON["content"];

  const header = document.createElement("h4");
  header.appendChild(
    document.createTextNode("Usuário " + email + " em " + timestamp + ": ")
  );

  const comment_paragraph = document.createElement("p");
  comment_paragraph.appendChild(document.createTextNode(content));
  const para_div = document.createElement("div");
  para_div.style.marginLeft = "2%";
  para_div.style.backgroundColor = "lightgray";
  para_div.appendChild(comment_paragraph);

  const main_div = document.createElement("div");
  main_div.style.marginTop = "5px";
  main_div.style.borderLeft = "3px solid green";
  main_div.appendChild(header);
  main_div.appendChild(para_div);

  return main_div;
}

function displayComment(comment_area_id, comment_JSON){
  var comment_section = document.getElementById(comment_area_id);
  var comment_div = generateCommentObject(comment_JSON);
  comment_section.appendChild(comment_div);
}

async function selectJSONFilepath(page_link) {
  // page_link = my_page_name.html
  const links = await fetch("links.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  for (var path in links) {
    if (links[path] == page_link) {
      return path;
    }
  }
  return "";
}

async function retrieveLastKComments(json_filepath, k = MAX_DISPLAYED_COMMENTS){
  console.log("json is ", json_filepath);
  const parsed_json = await fetch(json_filepath)
                      .then((response) => response.json())
                      .then((data) => {return data;});
  var ans = []
  var i = 0;
  for (index in parsed_json["comments"]){
    if (index < k){
      displayComment("comment-section", parsed_json["comments"][index]); // TODO remove constant
    } else {
      break;
    }
  }
}

async function main(){
  // assumes link of the form http://IP/page-name.html
  current_URL = document.URL.split("/")[document.URL.split("/").length - 1];

  const json_filepath = await selectJSONFilepath(current_URL); // needs to wait for the fetch
  console.assert(json_filepath != "", "Invalid JSON path");

  // the ../ accounts for the fact that this script is in a folder and the htmls are not
  retrieveLastKComments("../comments/" + json_filepath); // TODO remove constant
}

main();
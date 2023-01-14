const MAX_DISPLAYED_COMMENTS = 20;
const MAX_LEN_ID = 7;
/*
JSON structure of comment:
{
  id: int,
  timestamp: date,
  content: string,
  email: string
}
*/

function generateCommentObject(commentJSON) {
  const email = commentJSON["email"];
  const timestamp = commentJSON["timestamp"];
  const content = commentJSON["content"];

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

// Using fetch API
async function display_comments(element_id) {
  const global_info = await fetch("./global_info/globals.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  const total_comments = global_info["total_comments"];

  for (let i = 0; i < Math.min(MAX_DISPLAYED_COMMENTS, total_comments); i++) {
    comment_id =
      "0".repeat(MAX_LEN_ID - String(total_comments - i).length) +
      String(total_comments - i); // total_comments - i ==> selecting last comments

    path = "./comments/id_" + comment_id + ".json";
    var commentJSON;
    const _ = await fetch(path)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // data is the data of the json response
        // thus it's a Javascript object representing that JSON
        commentJSON = data;
      });
    const section = document.getElementById(element_id);
    const comment_HTMLObject = generateCommentObject(commentJSON);
    section.appendChild(comment_HTMLObject);
  }
}

console.log("Successful initialization");
display_comments("comment-section");

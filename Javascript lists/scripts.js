function addToList()
{
  var input = document.getElementsByClassName("insertlist")[0].value;

  if (input.length < 1)
  {
    document.getElementsByClassName("insertlist")[0].focus();
  }
  else
  {
    var node = document.createElement("li");
    var textnode = document.createTextNode(input);
  
    node.appendChild(textnode);
    document.getElementsByClassName("list")[0].appendChild(node);
  }
}

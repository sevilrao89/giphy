$(document).ready();
var apiKey = "e3ca6073db6240b99664780a0e729c67";
var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
var articles = [];


function ajaxCall(query, begin, end, amount) {
  //get url
  let newUrl = makeUrl(query, begin, end);
  //contact usps about your new york times subscription
  $.ajax({
    url: newUrl,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    articles = [];
    for(let i = 0; i < amount; i++) {
      //hire guy who's good with computers to organize your stuff
      articles.push({
        title: response.response.docs[i].headline.main,
        date: response.response.docs[i].pub_date,
        link: response.response.docs[i].web_url
      });
    }
    displayArticles(articles);
  });
}

function makeUrl (query, begin, end) {
  //check to see if beginning/end dates were included and edit appropriately
  let newUrl;
  if (end.length < 1 && begin.length < 1) {
    newUrl = url + $.param({
      'api-key': window.apiKey,
      'q': query,
    });
  }
  else if (end.length < 1) {
    newUrl = url + $.param({
      'api-key': window.apiKey,
      'q': query,
      'begin_date': begin.toString() + "0101",
    });
  }
  else if (end.length < 1) {
    newUrl = url + $.param({
      'api-key': window.apiKey,
      'q': query,
      'end_date': end.toString() + "0101",
    });
  }
  else {
    newUrl = url + $.param({
      'api-key': window.apiKey,
      'q': query,
      'begin_date': begin.toString() + "0101",
      'end_date': end.toString() + "0101"
    });
  }
  return newUrl
}

function displayArticles(articles) {
  //reference top articles and dump previous
  let displayBox = $("#top-articles");
  displayBox.empty();
  //process articles array into elements
  articles.forEach((value, index) => {
    let articleBox = $("<div class='card'>");
    //create individual divs for each article
    let elements = [
      //Title
      $(
        "<h1>"
        + (index + 1).toString()
        + ": "
        + value.title
        + "</h1>"),
      //Date
      $(
        "<h3>Date: "
        + value.date.split("T")[0]
        + "</h3>"
      ),
      //URL
      $(
        "<a href='"
        + value.link
        + "' target='_blank'>Go To Article</a>"
      )
    ];
    //push into top articles
    elements.forEach((value) => {
      articleBox.append(value)
    });
    //prosper
    displayBox.append(articleBox)
  });
}

$("#searchbutton").on("click", function (event) {
  //your friendly neighborhood search button
  event.preventDefault(); //cut that shit out
  let searchTerm = $("#searchInput").val();
  let amount = $("select option:selected").val();
  let start = $("#start").val();
  let end = $("#end").val();
  //check to see if input is valid
  if ((start.length !== 4 && start.length !== 0)
    || (end.length !== 4 && end.length !== 0))
  {
    alert("Please enter valid four digit years, e.g. '1995'");
  }
  else if (searchTerm.length < 1) {
    alert("Please enter a search term")
  }
  else {
    ajaxCall(
      searchTerm,
      start,
      end,
      amount
    )
  }
});
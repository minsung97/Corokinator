var burger = $('#menu-trigger');

burger.each(function(index){
  var $this = $(this);
  
  $this.on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('active-' + (index+1));
  })
});

burger.click(function(){
  var small_navbar = $('#small-navbar');
  if(small_navbar.css("display") == "none"){
    small_navbar.show();
  }
  else{
    small_navbar.hide();
  }
});

$(document).ready(function() {
  $.getJSON('https://openapi.naver.com/v1/search/news.json', function(data) { 
   
    var article_title = []; 
    var article_content = [];
    var article_link = [];
    var article_date  =[];
    
    $.each(data, function(i, item) { 
      for(var num = 0; num < 4; num++){
        article_title.push('<div>' + item.items[num].title + '</div>');
        article_content.push('<div>' + item.items[num].description + '</div>');
        article_date.push('<div>' + item.items[num].pubDate + '</div>');
      }
    });

    $('#article-title').html(article_title.join(''));
    $('#article-text').html(article_content.join(''));
    $('#article-time').html(article_date.join(''));
  });
});

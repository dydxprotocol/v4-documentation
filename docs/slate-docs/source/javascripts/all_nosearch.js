//= require ./lib/_energize
//= require ./app/_copy
//= require ./app/_toc
//= require ./app/_lang

function adjustLanguageSelectorWidth() {
  const elem = $('.dark-box > .lang-selector');
  elem.width(elem.parent().width());
}

$(function() {
  if ($(window.location.hash).get(0)) {
    $(window.location.hash).get(0).scrollIntoView(true);
  }
  loadToc($('#toc'), '.toc-link', '.toc-list-h2, .toc-list-h3', 10);
  setupLanguages($('body').data('languages'));
  $('.content').imagesLoaded( function() {
    window.recacheHeights();
    window.refreshToc();
  });

  $(window).resize(function() {
    adjustLanguageSelectorWidth();
  });
  adjustLanguageSelectorWidth();
});

window.onpopstate = function() {
  activateLanguage(getLanguageFromQueryString());
};

$(function() {
  // Expand menu
  $(".m-opener").on("click", function() {
    $(this).parent().toggleClass("m-open");
  });
  //
  $(".t-search")
  .focusin(function() {
    $(".m-open").removeClass("m-open");
    $(this).parent().addClass("t-open");
  })
  .focusout(function() {
    setTimeout(() => {
      $(this).parent().removeClass("t-open");
    }, "100")
  });

  // Update adobe fonts
  $("input").on("input", function() {
    reloadAdobeFonts();
  });

  // Define results
  const mLines = [
    ["東京メトロ有楽町線", "とうきょうめとろゆうらくちょうせん", "YurakuchoLine"],
    ["東京メトロ副都心線", "とうきょうめとろふくとしんせん", "FukutoshinLine"],
    ["東京メトロ千代田線", "とうきょうめとろちよだせん", "ChiyodaLine"],
    ["東京メトロ半蔵門線", "とうきょうめとろはんぞうもんせん", "HanzomonLine"],
    ["都営大江戸線", "とえいおおえどせん", "OedoLine"],
    ["都営浅草線", "とえいあさくさせん", "AsakusaLine"],
    ["都営新宿線", "とえいしんじゅくせん", "ShinjukuLine"],
    ["JR陸羽東線", "じぇいあーるりくうとうせん", "RikuuEastLine"],
    ["JR仙石線", "じぇいあーるせんせきせん", "SensekiLine"],
    ["JR湘南新宿ライン", "じぇいあーるしょうなんしんじゅくらいん", "ShonanShinjukuLine"],
    ["東京臨海高速鉄道りんかい線", "とうきょうりんかいこうそくてつどうりんかいせん", "TokyoRinkaiKosokuTetsudoRinkaiLine"],
  ];
  for (var i = 0; i < mLines.length; i++) {
    $(".m-suggestion").append(`<div class="ms-${i} m-suggest-link"><a>${mLines[i][0]}</a><br></div>`);
    $(".t-suggestion").append(`<div class="ts-${i} t-suggest-link"><a>${mLines[i][0]}</a><br></div>`);
  }

  // Show suggestion
  $(".m-sinput").on("input", function() {
    let value = $(this).val();
    for (var i = 0; i < mLines.length; i++) {
      let kanji = mLines[i][0].indexOf(value);
      let kana = mLines[i][1].indexOf(value);
      if (kanji !== -1 || kana !== -1) {
        $(`.ms-${i}`).css("display", "block");
      } else {
        $(`.ms-${i}`).css("display", "none");
      }
    }
  });
  //
  function findSuggest(val) {
    let value = val;
    for (var i = 0; i < mLines.length; i++) {
      let kanji = mLines[i][0].indexOf(value);
      let kana = mLines[i][1].indexOf(value);
      if (kanji !== -1 || kana !== -1) {
        $(`.ts-${i}`).css("display", "block");
      } else {
        $(`.ts-${i}`).css("display", "none");
      }
    }
  }
  $(".t-sinput").on("input", function() {
    findSuggest($(this).val());
  });
  $(".t-sinput").on("click", function() {
    findSuggest($(this).val());
  });


  // Update value
  $(".m-suggest-link").on("click", function() {
    $(".m-value").html($(this).html());
    $(this).parents(".menuer").toggleClass("m-open");
  });
  //
  $(".t-suggest-link").on("click", function() {
    $(".t-sinput").val($(this).children().html());
    $(this).parents(".texter").toggleClass("t-open");
  });
});

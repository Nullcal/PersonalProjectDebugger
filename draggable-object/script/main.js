$(function() {
  // Grobal variables
  let status = false;
  let target = $(document);
  let parent = $(document);

  let padding = {top:0, left:0};
  let parentp = {top:0, left:0};
  let origin = {top:0, left:0};

  let enableSnap = true;

  //
  $(".draggable").on("mousedown", function(e) {
    status = true;
    target = $(this);
    parent = target.parents(".draggable-parent");
    //
    padding = {
      top: e.clientY-target.offset().top,
      left: e.clientX-target.offset().left
    }
    parentp = {
      top: parent.offset().top,
      left: parent.offset().left
    }
    origin = {
      top: e.clientY,
      left: e.clientX
    }
  });

  //
  $(document).on("mouseup", function() {
    status = false;
  });

  //
  $(document).on("mousemove", function(e) {
    if (status) {
      let mouse = {
        top: e.clientY,
        left: e.clientX
      }
      let tmptar = {
        top: origin.top-(parentp.top+padding.top)+mouse.top-origin.top,
        left: origin.left-(parentp.left+padding.left)+mouse.left-origin.left
      }

      // スナップ先取得
      $(".snapper").each(function(i, elem) {
        let tmpsnap = {
          top: $(".snapper").eq(i).offset().top-parentp.top -1,
          left: $(".snapper").eq(i).offset().left-parentp.left -1
        }
        // ピタゴラスの定理
        let distance = Math.sqrt(Math.pow(tmpsnap.top-tmptar.top, 2)+Math.pow(tmpsnap.left-tmptar.left, 2));
        //
        if (distance < 32 && enableSnap) {
          // スナップあり
          $(".snapper").eq(i).css("opacity", 1);
          $(target).css("top", tmpsnap.top);
          $(target).css("left", tmpsnap.left);
          return false; // each離脱
        } else {
          // スナップなし
          $(".snapper").eq(i).css("opacity", .2);
          $(target).css("top", tmptar.top);
          $(target).css("left", tmptar.left);
        }
      });
    }
  });
});

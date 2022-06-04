$(function() {
  // Grobal variables
  let status = false; // 選択中を検出
  let snapping = true;
  let radius = 32;
  let $target, $parent, $snap;
  let _origin, _parent, _child, _offset, _terminus, _snap;

  //
  $(".nd-child").on("mousedown", function(e) {
    status = true;
    $target = $(this);
    $parent = $target.parents(".nd-parent");
    // カーソルのクリック位置
    _origin = {
      top: e.clientY,
      left: e.clientX
    }
    // 親要素のページ端からの位置
    _parent = {
      top: $parent.offset().top,
      left: $parent.offset().left
    }
    // 子要素のページ端からの位置
    _child = {
      top: $target.offset().top,
      left: $target.offset().left
    }
    // カーソルと子要素の位置の差
    _offset = {
      top: _origin.top-_child.top,
      left: _origin.left-_child.left
    }
  });

  //
  $(document).on("mouseup", function() {
    status = false;
  });

  //
  $(document).on("mousemove", function(e) {
    if (status) {
      // カーソルの移動後の位置
      _terminus = {
        top: e.clientY,
        left: e.clientX
      }
      // 子要素の移動後の位置
      _result = {
        top: _child.top-_parent.top+_terminus.top-_origin.top,
        left: _child.left-_parent.left+_terminus.left-_origin.left,
      }

      // スナップ先取得
      $(".nd-snap").each(function(i, elem) {
        $snap = $(".nd-snap").eq(i);
        let _snap = {
          top: $snap.offset().top-_parent.top -2,
          left: $snap.offset().left-_parent.left -2
        }
        // ピタゴラスの定理
        let distance = Math.sqrt(Math.pow((_snap.top+$snap.height()/2)-(_result.top+$target.height()/2), 2)+Math.pow((_snap.left+$snap.width()/2)-(_result.left+$target.width()/2), 2));
        //
        if (distance < radius && snapping) {
          // スナップあり
          $($target).css({"top":_snap.top+($snap.height()-$target.height())/2, "left":_snap.left+($snap.width()-$target.width())/2});
          return false; // each離脱
        } else {
          // スナップなし
          $($target).css({"top":_result.top, "left":_result.left});
        }
      });
    }
  });
});

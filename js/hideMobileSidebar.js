var mobile_sidebar_menus = document.getElementById("sidebar-menus");
if (mobile_sidebar_menus) {
    var menus_item_child = mobile_sidebar_menus.getElementsByClassName(
        "menus_item_child"
    );
    var menus_expand = mobile_sidebar_menus.getElementsByClassName("expand");
    for (var i = 0; i < menus_item_child.length; i++) {
        menus_item_child[i].style.display = "none";
    }
}
// for ContextMenu
let normalizePosition = (mouseX, mouseY, parent, children) => {
    // ? compute what is the mouse position relative to the container element (scope)
    var {
        left: scopeOffsetX,
        top: scopeOffsetY,
    } = parent.getBoundingClientRect();

    scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
    scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;

    var scopeX = mouseX - scopeOffsetX;
    var scopeY = mouseY - scopeOffsetY;

    // ? check if the element will go out of bounds
    var outOfBoundsOnX =
        scopeX + children.clientWidth * .75 > parent.clientWidth;

    var outOfBoundsOnY =
        scopeY + children.clientHeight * .75 > parent.clientHeight;

    var normalizedX = mouseX;
    var normalizedY = mouseY;

    // ? normalize on X
    if (outOfBoundsOnX) {
        normalizedX =
            scopeOffsetX + parent.clientWidth - children.clientWidth * .75;
    }

    // ? normalize on Y
    if (outOfBoundsOnY) {
        normalizedY =
            scopeOffsetY + parent.clientHeight - children.clientHeight * .75;
    }

    return { normalizedX, normalizedY };
};
var desktop = document.querySelector(".desktop");
var menu = document.getElementById("context-menu");
desktop.addEventListener("contextmenu", (event) => {
    document.body.click();

    var { clientX: mouseX, clientY: mouseY } = event;

    var { normalizedX, normalizedY } = normalizePosition(mouseX, mouseY, desktop, menu);

    menu.classList.remove("visible");

    menu.style.top = `${normalizedY}px`;
    menu.style.left = `${normalizedX}px`;

    setTimeout(() => {
        menu.classList.add("visible");
    });
});

document.body.addEventListener("click", (e) => {
    // ? close the menu if the user clicks outside of it
    //if (e.target.offsetParent != contextMenu) {
    menu.classList.remove("visible");
    //s}
});
window.oncontextmenu = (e) => {
    e.preventDefault();
}

// for Changing Wallpaper
// Set only one wallpaper (img18.png)
document.body.style.backgroundImage = "url('src/wallpaper/img18.png')";

// Preload just this one image (optional)
var PreImg = document.querySelector(".imagesToBePreloaded");
if (PreImg) {
    PreImg.innerHTML = `<img src="src/wallpaper/img18.png" width="1" height="1" border="0">`;
}


// fix for the issue #35
window.onscroll = _ => {
    scrollTo(0,0)
}

window.addEventListener("load", () => {

    const title1 = document.getElementById("title1");
    const title2 = document.getElementById("title2");
    const subtitle = document.getElementById("subtitle");
    const successIcon = document.getElementById("successIcon");
    const thrCardPopup = document.getElementById("thrCardPopup");
    const thrCard = document.getElementById("thrCard");
    const topFrame = document.getElementById("topFrame");
    const bottomFrame = document.getElementById("bottomFrame");
    const text = document.getElementById("ramadanText");
    const lanternLeft = document.getElementById("lanternLeft");
    const lanternRight = document.getElementById("lanternRight");
    const lanternLeftSmall = document.getElementById("lanternLeftSmall");
    const lanternRightSmall = document.getElementById("lanternRightSmall");

console.log(document.body);

lanternLeft.style.transform = "translateY(-350px)";
lanternRight.style.transform = "translateY(-350px)";
lanternLeftSmall.style.transform = "translateY(-500px)";
lanternRightSmall.style.transform = "translateY(-500px)";

let swingInterval;
let blinkInterval;
let hasExited = false;
let isThrCardOpen = false;

function startLanternSwing(){

let angle = 0;

swingInterval = setInterval(() => {

angle += 0.05;

lanternLeft.style.transform =
`translateY(0) rotate(${Math.sin(angle + 1) * 6}deg)`;

lanternRight.style.transform =
`translateY(0) rotate(${-Math.sin(angle + 0.1) * 4}deg)`;

lanternLeftSmall.style.transform =
`translateY(0) rotate(${Math.sin(angle + 1) * 6}deg)`;

lanternRightSmall.style.transform =
`translateY(0) rotate(${-Math.sin(angle + 0.1) * 4}deg)`;

}, 30);

}

topFrame.style.transform = "translate(-50%, -120%)";
bottomFrame.style.transform = "translate(-50%, 120%)";

setTimeout(() => {

topFrame.style.transition = "transform 1s ease";
bottomFrame.style.transition = "transform 1s ease";

topFrame.style.transform = "translate(-50%, 0)";
bottomFrame.style.transform = "translate(-50%, 0)";

}, 200);

setTimeout(() => {

title1.style.transition = "opacity 0.8s ease";
title1.classList.remove("opacity-0");

}, 1000);

setTimeout(() => {

lanternLeft.style.transition = "transform 0.8s ease-out";
lanternRight.style.transition = "transform 0.8s ease-out";
lanternLeftSmall.style.transition = "transform 0.8s ease-out";
lanternRightSmall.style.transition = "transform 0.8s ease-out";

lanternLeft.style.transform = "translateY(0)";
lanternRight.style.transform = "translateY(0)";
lanternLeftSmall.style.transform = "translateY(0)";
lanternRightSmall.style.transform = "translateY(0)";

startLanternSwing();

}, 700);

setTimeout(() => {

title2.style.transition = "opacity 0.8s ease";
title2.classList.remove("opacity-0");

}, 1300);

setTimeout(() => {

subtitle.style.transition = "opacity 1s ease";
subtitle.classList.remove("opacity-0");

startBlink();

}, 2000);

function startBlink(){

const subtitle = document.getElementById("subtitle");

blinkInterval = setInterval(() => {

if(subtitle.style.opacity === "0.1"){
    subtitle.style.opacity = "1";
}else{
    subtitle.style.opacity = "0.1";
}

}, 1000);

}

function openThrCard() {
if (isThrCardOpen) {
    return;
}

isThrCardOpen = true;
thrCardPopup.classList.remove("opacity-0");
thrCardPopup.classList.remove("pe-none");
thrCardPopup.classList.add("opacity-100");
thrCard.style.transform = "scale(1)";
}

function closeThrCard() {
if (!isThrCardOpen) {
    return;
}

isThrCardOpen = false;
thrCard.style.transform = "scale(0.7)";
thrCardPopup.classList.remove("opacity-100");
thrCardPopup.classList.add("opacity-0");
setTimeout(() => {
    if (!isThrCardOpen) {
        thrCardPopup.classList.add("pe-none");
    }
}, 350);
}

function startExit(){
if (hasExited) {
    return;
}

hasExited = true;

clearInterval(swingInterval);
clearInterval(blinkInterval);

setTimeout(()=>{
subtitle.textContent = "anda telah klaim THR.";
subtitle.style.transition = "none";
subtitle.style.opacity = "1";
successIcon.style.transition = "opacity 0.5s ease";
successIcon.classList.remove("d-none");
successIcon.classList.remove("opacity-0");
successIcon.classList.add("opacity-100");
},1000);
setTimeout(()=>{
openThrCard();
}, 500);

lanternLeft.style.transition = "transform 0.8s ease-in";
lanternRight.style.transition = "transform 0.8s ease-in";
lanternLeftSmall.style.transition = "transform 0.8s ease-in";
lanternRightSmall.style.transition = "transform 0.8s ease-in";

lanternLeft.style.transform = "translateY(-500px)";
lanternRight.style.transform = "translateY(-500px)";
lanternLeftSmall.style.transform = "translateY(-500px)";
lanternRightSmall.style.transform = "translateY(-500px)";

/* text fade */

title1.style.opacity = "0";
title2.style.opacity = "0";
setTimeout(() => {
title1.style.display = "none";
title2.style.display = "none";
}, 1000);

/* frame keluar */

setTimeout(()=>{

topFrame.style.transform = "translate(-50%, -150%)";
bottomFrame.style.transform = "translate(-50%, 150%)";

},300);

}

document.body.addEventListener("click", startExit);
document.addEventListener("click", (event) => {
if (!isThrCardOpen) {
    return;
}

if (!thrCard.contains(event.target)) {
    closeThrCard();
}
});

});

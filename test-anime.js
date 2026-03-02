import { animate, createTimeline } from "animejs";

console.log("animate:", animate.length);
console.log("createTimeline:", createTimeline.length);
const tl = createTimeline();
console.log("tl.add:", tl.add.length);

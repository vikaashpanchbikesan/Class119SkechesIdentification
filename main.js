function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}

function setup() {
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function draw() {
    strokeWeight(10);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function clearCanvas() {
    background("white");
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
       console.log(results);
        document.getElementById('label').innerHTML = "Label : " + results[0].label;
        document.getElementById('confidence').innerHTML = "Confidence : " + Math.round(results[0].confidence * 100) + "%";
        speak_data = "This is a " + results[0].label;
        utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

    }
}
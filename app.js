const btn = document.querySelector('.chat');
const content = document.querySelector('.content');

const greetings = ['I\'m good, How are you?', 'Yo my boy', 'Wassup' ];

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
    console.log('voice is activated, you can speak now on microphone !!!');
};

recognition.onresult = function(event) {
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;
    readOutLoud(transcript);
};

btn.addEventListener('click', () => {
    recognition.start();
});

function readOutLoud(message) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = 'What are you saying my boy?';

    if(message.includes('hey') || message.includes('hi') || 
       message.includes('hello') || message.includes('wassup')) {
        const finalText = greetings[(Math.floor(Math.random() * greetings.length))];
        speech.text = finalText;
    }

    if(message.includes('how are you')) {
        speech.text= greetings[0];
    }
    // speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}
const React = require('react');
const InputMessage = require('./InputMessage').InputMessage;
const Message = require('./Message').Message;
const messi = require('./Messi.jpg');
const thauvin = require('./Thauvin.jpg');

const datas = [
    {
        user : {
            name: "Messi",
            srcImg: messi
        },
        message : {
            creation : "8:00 Mon",
            content: "Bonjour ça va ?"
        }
    },
    {
        user : {
            name: "Thauvin",
            srcImg: thauvin
        },
        message : {
            creation : "11:25 Today",
            content: "Oui et toi jeune padawan?"
        }
    },
    {
        user : {
            name: "Messi",
            srcImg: messi
        },
        message : {
            creation : "11:26 Today",
            content: "Oui merci. Juste pour te dire que tu es de loin le meilleur joueur de la planète, j'ai beaucoup appris de ton pied gauche. Tu as de la chance d'évoluer dans un club aussi magnifique."
        }
    },
];

function Frame () {
    var i = 0;
    var messages = datas.map(data => <li key={i++}><Message user={data.user} message={data.message}/></li>)
    return(
        <div className="frame-message">
            <lu>{messages}</lu>
            <InputMessage/>
        </div>
    )
}

module.exports = {
    Frame : Frame
}
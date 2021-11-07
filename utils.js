function transposeChord(chord, amount) {
    var scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    var normalizeMap = { "Cb": "B", "Db": "C#", "Eb": "D#", "Fb": "E", "Gb": "F#", "Ab": "G#", "Bb": "A#", "E#": "F", "B#": "C" }
    return chord.replace(/[CDEFGAB](b|#)?/g, function (match) {
        var i = (scale.indexOf((normalizeMap[match] ? normalizeMap[match] : match)) + amount) % scale.length;
        return scale[i < 0 ? i + scale.length : i];
    })
}

function createElement(element, attribute, inner) {
    if (typeof (element) === "undefined") {
        return false;
    }
    if (typeof (inner) === "undefined") {
        inner = "";
    }
    var el = document.createElement(element);
    if (typeof (attribute) === 'object') {
        for (var key in attribute) {
            el.setAttribute(key, attribute[key]);
        }
    }
    if (!Array.isArray(inner)) {
        inner = [inner];
    }
    for (var k = 0; k < inner.length; k++) {
        if (inner[k].tagName) {
            el.appendChild(inner[k]);
        } else {
            el.appendChild(document.createTextNode(inner[k]));
        }
    }
    return el;
}
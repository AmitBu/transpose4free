// Global variable - save original chords list
let originalChordList = null;

function onLoad() {
    createTransposeField();
}

function createTransposeField() {
    let option;
    const label = createElement("h3", { 'class': 'yo' }, 'transpose4free');


    const selectAmountEle = document.createElement('select');
    for (let i = 6; i > -7; i--) {
        option = createElement('option', { 'value': i }, `${(i > 0 ? '+' : '')}${i / 2}`)

        if (i === 0) {
            option.setAttribute('selected', 'selected');
        }
        selectAmountEle.appendChild(option);
    }

    selectAmountEle.addEventListener('change', ({ target }) => {
        const value = parseInt(target.value) || 0;
        transposeTab4u(value);
    });

    const container = createElement("div", { 'id': 'field-container' }, [label, selectAmountEle]);
    document.querySelector('#shpa').prepend(container);
}

/**
 * Wrapper for chords transpose that support chords with '/'
 * @param {string} chord 
 * @param {float} amount 
 * @returns string of parsed chord(s)
 */
function parseAndTranspose(chord, amount) {
    const parsed = chord
        .split('/')
        .map(p => transposeChord(p, amount));

    // return transposeChord(p, amount);
    return parsed.join('/');
}

function transposeTab4u(amount) {
    const chordsSelector = '.chord_info + span';

    const elementList = document.querySelectorAll(chordsSelector);
    if (originalChordList === null) {
        originalChordList = [...elementList].map(e => e.innerText);
    }

    elementList.forEach((e, i) => {
        e.innerText = amount !== 0 ? parseAndTranspose(originalChordList[i], amount) : originalChordList[i];
    });
}

onLoad();
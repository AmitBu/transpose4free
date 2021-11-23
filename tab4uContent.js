// Global variable - save original chords list
let originalChordList = null;

function onLoad() {
    createTransposeField();
    loadTab4uChords();
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

/**
 * Used for chords that are missing from normal selector
 * It wraps the non-wrapped chords to be used in the original algorithm
 */
function findAndWrapMissingChords(originalChords = originalChordList) {
    const elementList = document.querySelectorAll('.chords');

    elementList.forEach((ele) => {
        const text = ele.innerText.trim();
        // Split & trim found chords
        const eleChords = text.replace(/\xA0/g, ' ').split(' ').filter(r => r).map(r => r.trim());
        // Remove chords that exists in `originalChords`
        const missingChords = eleChords.filter(c => !originalChords.includes(c));
        // Replace the original text chords version with wrapped one (to be used in main selector)
        missingChords.forEach(m => {
            ele.innerHTML = ele.innerHTML.replaceAll(`&nbsp;${m}`, `&nbsp;<div style="position: absolute; display: none;" class="chord_info"></div><span>${m}</span>`)
        });
    })
}

function selectAllChordElements() {
    const chordsSelector = '.chords .chord_info + span';
    return document.querySelectorAll(chordsSelector);
}

function selectAllChordTexts(elementList = selectAllChordElements()) {
    return [...elementList].map(e => e.innerText);
}

/**
 * Loads all tab4u chords into list (originalChordList)
 */
function loadTab4uChords() {
    const elementList = selectAllChordElements();

    // Runs only on first call
    if (originalChordList === null) {
        const chordsBeforeWrap = selectAllChordTexts(elementList);
        findAndWrapMissingChords(chordsBeforeWrap);
        // Update chords list with missing chords after wrapping missing ones
        originalChordList = selectAllChordTexts();
    }
}

/**
 * Goes over the chords element list and updates element text after transpose
 * @param {float} amount 
 */
function transposeTab4u(amount) {
    const elementList = selectAllChordElements();

    elementList.forEach((e, i) => {
        e.innerText = amount !== 0 ? parseAndTranspose(originalChordList[i], amount) : originalChordList[i];
    });
}

onLoad();
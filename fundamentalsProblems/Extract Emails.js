'use strict';
function extractEmail(input) {
    let match = input.match(/\s+[A-Za-z0-9]+[\w\.\-]*[A-Za-z0-9]@[A-Za-z]+[\-\.A-Za-z]+\.[A-Za-z]+/g);
    match.forEach(em => console.log(em));
}
extractEmail(`Please contact us at: support@github.com.`)
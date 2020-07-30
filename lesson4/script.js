function regTest(regexp, selector) {
    let field = document.querySelector(`${selector}`);
    if (regexp.test(field.value) || field.value === null) {
        field.classList.remove("wrongData");
        field.classList.add("rightData");
    } else {
        field.classList.remove("rightData");
        field.classList.add("wrongData");
    }
}

function formValidation() {
    regTest(/^[A-ZА-Я][a-zа-я]{1,}$/, "#username");
    regTest(/^\+\d{1}\(\d{3}\)\d{3}\-\d{4}$/, "#userphone");
    regTest(/^[A-Za-z]*[.-]?[A-Za-z]+\@[a-z]+\.[a-z]{2,3}$/, "#email");
    let inputs = [...document.querySelectorAll("fieldset input")];
    return inputs.some(el => el.classList.contains("wrongData") || el.value == "") ?
        false :
        true;
}

let text =
    "One: 'Hi Mary.' Two: 'Oh, hi.'\nOne: 'How are you\
 doing?'\nTwo: 'I'm doing alright. How about you?'\nOne:\
 'Not too bad. The weather is great isn't it?'\nTwo:\
 'Yes. It's absolutely beautiful today.'\nOne: 'I wish\
 it was like this more frequently.'\nTwo: 'Me too.'\nOne:\
 'So where are you going now?'\nTwo: 'I'm going to meet a\
 friend of mine at the department store'\nOne: 'Going to\
 do a little shopping?'\nTwo: 'Yeah, I have to buy some\
 presents for my parents.'\nOne: 'What's the occasion?'\nTwo:\
 'It's their anniversary.'\nOne: 'That's great. Well, you\
 better get going. You don't want to be late.'\nTwo: 'I'll\
 see you next time.'\nOne: 'Sure.' Bye.'";

function fixText(text) {
    document.querySelector('.fixedText').innerText = `${text.replace(/(?<!\w)'|'(?!\w)/g, '"')}`;
}

fixText(text);
const CHECKED_IMG="images/checked.png";
const UNCHECKED_IMG="images/unchecked.png";


function calcoloP(){
    const choice_one = Mappa['one'];
    const choice_two = Mappa['two'];
    const choice_three = Mappa['three'];
    let title;
    let content;

    if(choice_one === choice_two || choice_one === choice_three || choice_one !== choice_two && choice_two !== choice_three){
        title=RESULTS_MAP[choice_one]['title'];
        content=RESULTS_MAP[choice_one]['contents'];
    }else{
        title=RESULTS_MAP[choice_two]['title'];
        content=RESULTS_MAP[choice_two]['contents'];
    }
    result(title,content);
}

function ricomincia(){
    const risultato=document.querySelector('#result');
    risultato.innerHTML='';
    Mappa={};
    for(const box of boxes){
        box.addEventListener('click',change);
        box.classList.remove('select');
        box.classList.remove('notSelect');
        const deselected=box.querySelector('img.checkbox');
        deselected.src = UNCHECKED_IMG;
    }
}

function result(title,content){
    const titolo = document.createElement('h1');
    const contenuto = document.createElement('p');
    const button = document.createElement('button');

    titolo.textContent=title;
    contenuto.textContent=content;
    button.textContent='Ricomicia il quiz';

    button.addEventListener('click',ricomincia);

    const risultato=document.querySelector('#result');
    risultato.appendChild(titolo);
    risultato.appendChild(contenuto);
    risultato.appendChild(button);
}

let Mappa={};
function addToMap(domanda,risposta)
{
    Mappa[domanda]=risposta;
    if(Object.keys(Mappa).length===3){
        for(const box of boxes){
            box.removeEventListener('click',change);
        }
        calcoloP();
    }
}


function change(event){
    const select=event.currentTarget;
    const checkbox=select.querySelector('img.checkbox');
    const risposta=select.dataset.choiceId;
    const domanda=select.dataset.questionId;

    for(const box of boxes){
        if(domanda === box.dataset.questionId && risposta !== box.dataset.choiceId){
            box.classList.remove('select');
            box.classList.add('notSelect');
            const deselect=box.querySelector('img.checkbox');
            deselect.src=UNCHECKED_IMG;

        }
        else
        {
            select.classList.add('select');
            select.classList.remove('notSelect');
            checkbox.src=CHECKED_IMG;
        }
    }
    addToMap(domanda,risposta);
}



const boxes = document.querySelectorAll('.choice-grid div');
for(const box of boxes){
    box.addEventListener('click',change);
}



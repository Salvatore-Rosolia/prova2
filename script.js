// funzione per creare gli elementi di tipo immagine  
function createImage(src){
const image = document.createElement('img');
image.src= src;
return image;
}



// Funzione che crea un elemento e gli appende tutti i componenti
function createElement(top, image, descrizione, more_info){
    const box_elemento = document.createElement("div");
    box_elemento.classList.add("elemento");
    
   
    box_elemento.appendChild(top);
    box_elemento.appendChild(image);
    box_elemento.appendChild(descrizione);
    box_elemento.appendChild(more_info);
    return box_elemento;
    

}



// ciclo for per caricare tutti i componenti 

const contenitore = document.querySelector("#mega_box");
for(let i=0;i< photo_list.length; i++){
    
    const top = document.createElement("div");  
    top.classList.add("top_item");
    
    const testo = document.createElement("h1");
    testo.classList.add("titolo_box");
    testo.textContent = nomi_list[i];
    
    const prezzo= document.createElement("p");
    prezzo.classList.add("prezzo");
    prezzo.textContent = prezzi_list[i];
    
    const star = createImage("no_preferiti.png");
    star.classList.add("segno_pre");
    star.addEventListener("click", add_preferiti);
    
    
    top.appendChild(testo);
    top.appendChild(prezzo);
    top.appendChild(star);

    const photosrc= photo_list[i];
    const image= createImage(photosrc);
    image.classList.add("image_box");

    const descrizione= document.createElement("p");
    descrizione.textContent = descrizioni_list[i];
    descrizione.classList.add("info_estese");
    descrizione.classList.add("hidden");
   
    const more_info = document.createElement("button");
    more_info.classList.add("press_info");
    more_info.textContent = "MOSTRA INFO";
    more_info.addEventListener("click", mostra_info);

    const elemento = createElement(top,image,descrizione, more_info);
    
    contenitore.appendChild(elemento);
    
}


const elementi = document.querySelectorAll('.elemento');
function mostra_info(event){
    
    event.currentTarget.textContent = "NASCONDI INFO";
    event.currentTarget.removeEventListener("click", mostra_info);
    const info = event.currentTarget.parentNode.querySelector(".info_estese");
    info.classList.remove("hidden");
    event.currentTarget.addEventListener("click", nascondi_info);
      
}

function nascondi_info(event){
    event.currentTarget.textContent = "MOSTRA INFO";
    event.currentTarget.removeEventListener("click", nascondi_info);
    const info = event.currentTarget.parentNode.querySelector(".info_estese");
    info.classList.add("hidden");
    event.currentTarget.addEventListener("click", mostra_info);

}





function remove_da_preferiti(event){
    event.currentTarget.removeEventListener("click", remove_da_preferiti);
    event.currentTarget.src="no_preferiti.png";
    const elemento_sel = event.currentTarget.parentNode.querySelector("h1");
    const elementi= document.querySelectorAll("#preferiti .elemento h1"); 
    for(elemento of elementi){
        if(elemento.textContent === elemento_sel.textContent){
            elemento.parentNode.parentNode.remove();
        }
    }
    if(document.querySelector("#preferiti .elemento") == null){
        document.querySelector("h1").classList.add("hidden");
        document.querySelector("#preferiti").classList.add("hidden");
    }
    event.currentTarget.addEventListener("click", add_preferiti);
}


function remove_da_pre(event){
    event.currentTarget.removeEventListener("click", remove_da_pre);
    const elemento_sel = event.currentTarget.parentNode.querySelector("h1");
    const elementi= document.querySelectorAll("#mega_box .elemento h1"); 
    for(elemento of elementi){
        if(elemento.textContent === elemento_sel.textContent){
            elemento.parentNode.querySelector("img").src="no_preferiti.png";
            elemento_sel.parentNode.parentNode.remove();
        }
        elemento.parentNode.querySelector("img").addEventListener("click", add_preferiti);
    }
    if(document.querySelector("#preferiti .elemento") == null){
        document.querySelector("h1").classList.add("hidden");
        document.querySelector("#preferiti").classList.add("hidden");
    }  
}


function add_preferiti(event)
{
    event.currentTarget.src="preferito.png";
    event.currentTarget.removeEventListener("click", add_preferiti);
    event.currentTarget.addEventListener("click", remove_da_preferiti);
    const title = document.querySelector("h1");
    title.classList.remove("hidden");
    const box_selezionato= event.currentTarget.parentNode.parentNode;
    const mega_box_pre = document.querySelector("#preferiti");
    mega_box_pre.classList.add("box_preferiti");
    const copy = box_selezionato.cloneNode(true);
    copy.classList.add("elemento");
    const more_info = copy.querySelector("button");
    more_info.addEventListener("click", mostra_info);
    const remove_pre = copy.querySelector(".segno_pre");
    remove_pre.addEventListener("click", remove_da_pre);
    mega_box_pre.appendChild(copy);
    title.classList.remove("hidden");
    mega_box_pre.classList.remove("hidden");
}


function cerca(event) {
    var i= 0;
    const barradiricerca = event.currentTarget;
    const cont = document.querySelector("#mega_box");
    const lista = cont.querySelectorAll("h1");
    for(elemento of lista)
    {
        if(elemento.textContent.toLowerCase().search(barradiricerca.value.toLowerCase()) === -1)
        {
            elemento.parentNode.parentNode.classList.add("hidden");
            i++;
        }
        else
        elemento.parentNode.parentNode.classList.remove("hidden");
    }
}
const barradiricerca = document.querySelector("input[type='text']");
barradiricerca.addEventListener("keyup", cerca);
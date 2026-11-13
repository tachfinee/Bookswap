const url = "http://127.0.0.1:8000/api/v1/exchange-requests"

fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        


        let allExchanges = data.data
        console.log(allExchanges)

        

        let  acceptedExchanges = getAcceptedExchanges(allExchanges)

        afficherRecherche(acceptedExchanges)


        afficherTousLesExchanges(acceptedExchanges)
        

        let form = document.forms["formRecherche"]

        form.addEventListener("submit", (event)=>{
            event.preventDefault()
            
            let exchangesRecherche = acceptedExchanges.filter( exchangeData => exchangeData.book.title.toUpperCase().includes(form.recherche.value.toUpperCase()) || exchangeData.offers[0].offered_book.title.toUpperCase().includes(form.recherche.value.toUpperCase()))
            afficherTousLesExchanges(exchangesRecherche)
        })
       

       



        
    })

    function afficherRecherche(acceptedExchanges){
        let recherche = document.getElementById('recherche')
        recherche.innerHTML +=`<form name="formRecherche">
                <label for="recherche">Rechercher</label><br>
                <input class="border rounded-lg" type="text" id="recherche" name="recherche">                
                <label for="category-select">Catégorie</label>
                <select name="categories" id="category-select">
                    <option value="toutesCategories"> Toutes les catégories </option>
                    ${getCategory(acceptedExchanges)}
                </select>
                <input class="bg-blue-500 p-1 rounded-xl" type="submit" value="Actualiser">
            </form>`
    }

    function getCategory(acceptedExchanges){
        let categories = []
        let options=''
        acceptedExchanges.forEach(acceptedExchange => {

            options+= `<option value="${acceptedExchange.book.category.slug}"> ${acceptedExchange.book.category.name} </option>`
        })
        return options
    }



    function getAcceptedExchanges(allExchanges){

        let acceptedExchanges = []
        allExchanges.forEach((exchange)=>{
            if(exchange.status=='open'){
                acceptedExchanges.push(exchange)
            }
            
        })
        return acceptedExchanges

    }

    function afficherTousLesExchanges(acceptedExchanges){
        exchanges.innerHTML = ''
        acceptedExchanges.forEach((exchange)=>{           
                afficherExchange(exchange)                        
        })        
    }

    function afficherExchange(exchange){
        let exchanges = document.getElementById('exchanges')

        
        exchanges.innerHTML += `<div class="flex flex-col bg-[#FDFDFB] rounded-xl">
                    <h3 class="${getExchangeTypeColors(exchange.exchange_type)} p-1 m-2">${getExchangeType(exchange.exchange_type)}</h3>
                    <div class="flex flex-row justify-between m-2">
                        <div class="flex flex-row">
                            <img src="assets/images/livre1.png" alt="image-livre">
                            <div>
                                <h3>${exchange.book.title}</h3>
                                <h4>${exchange.book.author}</h4>
                                <p class="text-[#8D80D0] bg-[#E6E4FC] rounded-lg p-1 text-xs">${exchange.book.category.name}</p>
                                <span class="flex flex-row">
                                    ${getTag(exchange.book.tags)}
                                    
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <img class="image" src="assets/images/livre2.png" alt="image-livre">
                            <div class="m-1">
                                <h3 class="booktwo">${exchange.offers[0].offered_book.title}</h3>
                                <h4>${exchange.offers[0].offered_book.author}</h4>
                                <p class="text-[#8D80D0] bg-[#E6E4FC] rounded-lg p-1 text-xs">${exchange.offers[0].offered_book.category.name}</p>
                                <span class="flex flex-row">
                                    ${getTag(exchange.offers[0].offered_book.tags)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between m-2">
                        <div class="flex flex-row items-center">
                            <img src="assets/images/profil.png" width="55" alt="image user">
                            <p>${exchange.book.owner.name}</p>
                        </div>
                        <a href="" class="text-[#8D80D0] bg-[#E6E4FC] rounded-lg m-2 p-2">Voir les détails</a>
                    </div>

                </div>`
    }

    function getTag(tags){
        let allTags = ''
        tags.forEach(tag=>{
            allTags += `<p class="bg-[#F1F2F9] p-1 m-1 rounded-lg">#${tag}</p>`
        })
        return allTags

    }

    function getExchangeType(exchangeType){
        if(exchangeType == "temporary"){
            return "Echange temporaire"
        }
        if(exchangeType == "permanent"){
            return "Echange définitif"
        }
    }

    function getExchangeTypeColors(exchangeType){
        if(exchangeType == "temporary"){
            return "text-[#CDA85A] bg-[#FFF3CE]"
        }
        if(exchangeType == "permanent"){
            return "text-[#5D9C62] bg-[#DAF6DE]"
        }
    }
const url = "http://127.0.0.1:8000/api/v1/exchange-requests"

fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        


        let allExchanges = data.data
        console.log(allExchanges)

        let  acceptedExchanges = getAcceptedExchanges(allExchanges)
        afficherTousLesExchanges(acceptedExchanges)
        

        let form = document.forms["formRecherche"]

        form.addEventListener("submit", (event)=>{
            event.preventDefault()
            
            let exchangesRecherche = acceptedExchanges.filter( exchangeData => exchangeData.book.title.toUpperCase().includes(form.recherche.value.toUpperCase()) || exchangeData.offers[0].offered_book.title.toUpperCase().includes(form.recherche.value.toUpperCase()))
            afficherTousLesExchanges(exchangesRecherche)
        })
       

        console.log(form)



        
    })

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
                    <h3 class="bg-[#DAF7D7] p-1 m-2">Echange définitif</h3>
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
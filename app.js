const url = "http://127.0.0.1:8000/api/v1/exchange-requests"

fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
        
        afficherTousLesExchanges(data.data)
        console.log(data.data)
        
        
        
    })



    function afficherTousLesExchanges(data){
        data.forEach((exchange)=>{
            afficherExchange(exchange)
        })
        
    }

    function afficherExchange(exchange){
        let exchanges = document.getElementById('exchanges')

        exchanges.innerHTML += `<div class="flex flex-col bg-[#FDFDFB] rounded-xl">
                    <h3 class="bg-[#DAF7D7] p-1 m-1">Echange définitif</h3>
                    <div class="flex flex-row justify-between">
                        <div class="flex flex-row">
                            <img src="assets/images/livre1.png" alt="image-livre">
                            <div>
                                <h3>${exchange.book.title}</h3>
                                <h4>auteur</h4>
                            </div>
                        </div>
                        <div class="flex flex-row">
                            <img src="assets/images/livre2.png" alt="image-livre">
                            <div class="m-1">
                                <h3>${exchange.offers[0].id}</h3>
                                <h4>auteur</h4>
                                <p class="text-[#8D80D0] bg-[#E6E4FC] rounded-lg p-1 text-xs">Développement</p>
                                <span class="flex flex-row">
                                    <p class="bg-[#F1F2F9] p-1 m-1 rounded-lg">#code</p>
                                    <p class="bg-[#F1F2F9] p-1 m-1 rounded-lg">#qualité</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="flex flex-row">
                            <img src="" alt="image user">
                            <p>Mehdi Berrada</p>
                        </div>
                        <a href="" class="text-[#8D80D0] bg-[#E6E4FC] rounded-lg m-2 p-2">Voir les détails</a>
                    </div>

                </div>`
    }
const input$$ = document.querySelector("input");
const button$$ = document.querySelector("button");

const handleClick = event => {
    event.preventDefault();
    const inputValue = input$$.value.trim();
    const baseUrl = `https://api.nationalize.io?name=${inputValue}`;
    fetch(baseUrl)
    .then(res=>res.json())
    .then(myJson=>{
        console.log(myJson);
        if(myJson.count !==0){
        const countriesAndChances = myJson.country;
            for (countryAndChance of countriesAndChances){
                console.log(countryAndChance)
                const p$$ = document.createElement("p");
                document.body.appendChild(p$$);
                const chance = countryAndChance.probability;
                const country = countryAndChance.country_id;
                p$$.textContent = `The name ${inputValue} has ${chance} chances to come from ${country}`;
                }
        }
        else{
            const p$$ = document.createElement("p");
            document.body.appendChild(p$$);
            p$$.textContent = `Unfortunately, the name ${inputValue} doesn't exist in our database`; 
        }
    })
    .catch(error=>console.log(error));
};
button$$.addEventListener("click", handleClick);
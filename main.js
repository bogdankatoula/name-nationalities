const input$$ = document.querySelector("input");
const button$$ = document.querySelector("button");

const h2$$ = document.createElement("h2");
document.body.insertBefore(h2$$, input$$);
h2$$.textContent = "Which country is your name from?";

const resultContainer$$ = document.createElement("div");
document.body.appendChild(resultContainer$$);

const handleClick = event => {
    event.preventDefault();
    while (resultContainer$$.firstChild) {
        resultContainer$$.removeChild(resultContainer$$.firstChild);
    }
    const inputValue = input$$.value.trim();
    const baseUrl = `https://api.nationalize.io?name=${inputValue}`;
    fetch(baseUrl)
    .then(res=>res.json())
    .then(myJson=>{
        console.log(myJson);
        if(myJson.count !==0){
        const p$$ = document.createElement("p");
        document.body.appendChild(p$$);
        p$$.textContent = `Currently, ${myJson.count} people bear the name ${inputValue} in the world according to this database`;
        const countriesAndChances = myJson.country;
            for (const countryAndChance of countriesAndChances){
                console.log(countryAndChance)
                const p$$ = document.createElement("p");
                resultContainer$$.appendChild(p$$);
                const chance = countryAndChance.probability;
                const country = countryAndChance.country_id;
                p$$.textContent = `The name ${inputValue} has ${chance} chances to come from ${country}`;
                }
        }
        else{
            const p$$ = document.createElement("p");
            resultContainer$$.appendChild(p$$);
            p$$.textContent = `Unfortunately, the name ${inputValue} doesn't exist in our database`; 
        }
    })
    .catch(error=>console.log(error));
};
button$$.addEventListener("click", handleClick);
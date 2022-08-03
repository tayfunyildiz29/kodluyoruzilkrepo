//add new spending button
const newButton = document.getElementById("add")

//table body
const tbody = document.getElementById("tbody")

//initial settings fields

const budgetField = document.getElementById("budget")
const startDateField= document.getElementById("startDate")
const endDateField= document.getElementById("endDate")
const initialSettingsButton = document.getElementById("initialSettingsButton")

// summary fields
const numberOfDaysPassedField = document.getElementById("numberOfDaysPassedField")
const leftDaysField = document.getElementById("numberOfDaysLeft")
const balanceField = document.getElementById("balanceField")
const dailyAverageField = document.getElementById("dailyAverageField")
const averageField = document.getElementById("averageField")
const totalSpendingField = document.getElementById("totalSpendingField")
const leftDaysAverageField = document.getElementById("leftDaysAverageField")

// reset button
const resetButton = document.getElementById("resetButton")

//Budget - start and end date settings done here:

initialSettingsButton.addEventListener("click", initialSettings)

function initialSettings(){
    
        if (budgetField.value.length >0 && startDateField.value.length>0 && endDateField.value.length >0 ){
            let budget = budgetField.value
            let startDate = startDateField.value
            let endDate = endDateField.value
            localStorage.setItem("budget", budget)
            localStorage.setItem("startDate", startDate)
            localStorage.setItem("endDate", endDate)
            location.reload()
            } else{ alert("Eksik veya hatalı bilgi girişi!")}
    }
        


//

document.body.onload= loadData

// loadData function starts here
function loadData(){

    // if budget, start, and end date data is stored in local storage, load it here
    if (localStorage.budget !== undefined  &&  localStorage.startDate !== undefined && localStorage.endDate !== undefined ){
        budgetField.value = localStorage.getItem("budget")
        startDateField.value = localStorage.getItem("startDate")
        endDateField.value = localStorage.getItem("endDate")
        
        let todaysDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
        let leftDays = Math.floor((new Date(endDateField.value)- todaysDate )/(1000*60*60*24))
        leftDaysField.innerHTML= leftDays
        
        passedDays = Math.floor((todaysDate - new Date(startDateField.value))/(1000*60*60*24))
        numberOfDaysPassedField.innerHTML=passedDays

    }else{
        
    }

 

    if (localStorage.getItem("storedData")!== undefined){

        storedData = JSON.parse(localStorage.getItem("storedData"))
    
        amounts = []
        storedData.forEach((item) =>{ 
            amounts.push(Number(item[5]))        
        })
    
        //total spending
        let totalSpending = 0
        amounts.forEach((amount)=> totalSpending += amount)
        totalSpendingField.innerHTML += "<div>"+  totalSpending + "₺ </div>"
    
        //Balance 
    
        let budget = localStorage.getItem("budget")
        let budgetLeft = Number(budget) - totalSpending
        balanceField.innerHTML = budgetLeft.toLocaleString("en") +"₺"
    
        //average spending
        let averageSpending= totalSpending / amounts.length
        if (averageSpending >0){
            averageField.innerHTML += "<div>"+ averageSpending.toFixed(2)+ "₺ </div>"

        }
        
    
        //Dates
        let todaysDate = new Date(`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`)
    
        let startDate = localStorage.getItem("startDate")
        passedDays = Math.floor((todaysDate - new Date(startDate))/(1000*60*60*24))
    
        let endDate = localStorage.getItem("endDate")
    
        let leftDays = Math.floor((new Date(endDate)- todaysDate )/(1000*60*60*24))
        if (leftDays > 0){
            leftDaysField.innerHTML= leftDays
        }{leftDaysField.innerHTM=""}
        
    
    
        // Daily average
      
        let dailyAverage = totalSpending / passedDays
        if(passedDays>0 && dailyAverage > 1){
            dailyAverageField.innerHTML = dailyAverage.toLocaleString("en") +"₺"

        }
    
        
    
        // left Days Average
        
        let leftDaysAverage = (budgetLeft / leftDays).toFixed(2)
        leftDaysAverageField.innerHTML=leftDaysAverage.toLocaleString("en")+"₺"
        
    }
}
// loadData function ends here


if (localStorage.getItem("storedData") === null){

        storedData=[]
        localStorage.setItem("storedData", JSON.stringify(storedData))
        newButton.addEventListener("click", startAdding)

        function startAdding(){
            let counter=1
            let today = new Date().toLocaleDateString("tr-TR")
            let time = new Date().toLocaleTimeString("tr-TR")

            let shopInput = document.getElementById("places")
            shopInput.addEventListener("focusout", getShopInput)
            function getShopInput(){
                return this.value
            
            }

            let place = shopInput.value

            let typeInput = document.getElementById("chooseType")
            typeInput.addEventListener("focusout", getTypeInput)
            function getTypeInput(){
            
            }


            let type = typeInput.value

            let price = document.getElementById("price").value

            if(place!=0 && type!=0  && price != ""){
                
                storedData.push([counter, today, time, place, type, price ])
                localStorage.setItem("storedData", JSON.stringify(storedData))
                tableDisplay()
                location.reload()  

            }
            else{alert("Eksik bilgi girişi")}

        }

    } else {
        tableDisplay()
        newButton.addEventListener("click", add)
        function add(){
            counter = storedData.length+1
            let today = new Date().toLocaleDateString("tr-TR")
            let time = new Date().toLocaleTimeString("tr-TR")
            
            let shopInput = document.getElementById("places")
            shopInput.addEventListener("focusout", getShopInput)
            function getShopInput(){
            return this.value
            }

            let place = shopInput.value


            let typeInput = document.getElementById("chooseType")
            typeInput.addEventListener("focusout", getTypeInput)
            function getTypeInput(){
            return this.value
            }

            let type = typeInput.value
            
            let price = document.getElementById("price").value
            if(place!=0 && type!=0 && price != "" ){

            storedData.push([counter, today, time, place, type, price ])
            localStorage.setItem("storedData", JSON.stringify(storedData))
                
            location.reload()
            }else{alert("Eksik bilgi girişi")}

        }

    }



// Sependings table display function defined here
function tableDisplay(){
    storedData = JSON.parse(localStorage.getItem("storedData")) 
    storedData.forEach(expenseItem => {
        tbody.innerHTML += `<tr><td>${expenseItem[0]}</td><td>${expenseItem[1]}</td><td>${expenseItem[2]}</td><td>${expenseItem[3]}</td><td>${expenseItem[4]}</td><td>${expenseItem[5]}<span id ="cur">₺</span></td></tr>`
        
    });
}

resetButton.addEventListener("click", reset)
let counter = 3
function reset() {
    let message = "kez daha"
    resetButton.innerHTML = `${counter-1} ${message}`
    counter --
    
    if (counter === 0){
        location.reload()
        localStorage.clear()
        resetButton.innerHTML = "Veriler silindi"
        document.getElementById("warning").innerHTML =""
        resetButton.removeEventListener("click", "reset")

    }

    }
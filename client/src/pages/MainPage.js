import axios from 'axios';
import React, { useEffect, useState } from 'react';
 

export default function MainPage() {
    
    //States for the home fields

    const [date , setDate] = useState(null);
    //source Currency
    const [sourceCurrency , setSourceCurrency] = useState("");
    //Target Currency
    const [ targetCurrency , setTargetCurrency] = useState("");
    //amount in source currency
    const [amountInSourceCurrency , setAmountInSourceCurrency ] = useState(0);
    //amount in target currency
    const [amountInTargetCurrency , setAmountInTargetCurrency ] = useState(0);
    //Currency Names From API
    const [currencyNames , setCurrencyNames ] = useState([]);
    //set visibility
    const [isLabelVisible, setIsLabelVisible] = useState(false);

    //Form Submit Handle Method
     const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            
            const responce = await axios.get("http://localhost:5000/convert" , {
                params : {
                    date , sourceCurrency , targetCurrency , amountInSourceCurrency, 
                },
            });
            
            
            const tot = responce.data;
            if(tot){
            setAmountInTargetCurrency(tot.toFixed(2));
            setIsLabelVisible(true); 
            console.log(amountInTargetCurrency);  
            } else {
                console.log("Error occured")
            }
            
            //ToDo : Do the work

        }catch(err){
            console.error(err)
        }
    }

    //Get All Currency Names
    useEffect(() => {
    const getTheCurrencies = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(responce.data);
      } catch (err) {
        console.error(err);
      }
    };
    getTheCurrencies();
  }, []);

     

  return (
    <div>
        <h1 className="lg:mx-32 text-5xl font-bold text-blue-500">
            Convert Currencies at today's rate
        </h1>
        <p className="lg:mx-32 opacity-35 py-5">
            Currency Converter allows you to convert Currencies according to todays rate at your prefered location
            </p>

        <div className="mt-5 flex items-center justify-center flex-col">
            <section className="w-full lg:w-1/2">
                <form
                onSubmit={handleSubmit} 
                class="max-w-sm mx-auto">

                    {/* get the date */}
                    <div class="mb-5">
                        <label htmlFor={date} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>

                        <input type='date'
                        onChange={(e) => setDate(e.target.value)}
                        id={date}
                        name={date}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>

                    {/* Select the Source Currency */}
                    <div class="mb-5">
                        <label htmlFor={sourceCurrency} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source Currency</label>

                        <select 
                        onChange={(e) => setSourceCurrency(e.target.value)}
                        id={sourceCurrency}
                        name = {sourceCurrency}
                        value={sourceCurrency}
                        type='text' 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required 
                        >
                            <option value='None'>Select The source Currency</option>

                           {Object.keys(currencyNames).map((currency) => (
                                <option className=" p-1" key={currency} value={currency}>
                                  {currencyNames[currency]}
                                </option>
                                     ))}
                          
                        </select>
                        
                    </div>

                    {/* Select the Target Currency */}
                    <div class="mb-5">
                        <label htmlFor={targetCurrency} 
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target Currency</label>
                        
                        <select
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        id={targetCurrency}
                        name = {targetCurrency}
                        value={targetCurrency}
                        type='text' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        
                        <option value=''>Select The Target Currency</option>
                        {Object.keys(currencyNames).map((currency) => (
                                <option className=" p-1" key={currency} value={currency}>
                                  {currencyNames[currency]}
                                </option>
                                     ))}

                        </select>
                    </div>

                    {/* Get the Amount */}
                    <div class="mb-5">
                        <label htmlFor={amountInSourceCurrency}
                         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source Currency : </label>

                        <input
                        onChange={(e) => setAmountInSourceCurrency(e.target.value)}
                        id={amountInSourceCurrency}
                        name = {amountInSourceCurrency}
                        value={amountInSourceCurrency}
                        type='number' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                    </div>
                    {/* show amount in target currecies */}
                    <div class="mb-5">
                        {isLabelVisible && (
                            <label htmlFor="amountInTargetCurrency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                 Amount in Target Currency: ${amountInTargetCurrency}
                </label>
            )}

                        
                    </div>

                    {/* Submit */}
                    <button class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Get The Target Currency
                        </button>
                </form>
            </section>
        </div>

    </div>

  )

  
}





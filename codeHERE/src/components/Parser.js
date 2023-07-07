// gh-pages, axios, cheerios already installed
import { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import axios from "axios"

import MainTable from "./MainTable"



// В данному компоненті була дуже серйозна дірка, через яку react викидав помилку: cannot read property of 'undefined', коли я намагався скористуватися данним з API стороннього сайту. Це було через те, що react не чекає на те коли запрацює promise, який надасть значення змінній data і відповідно з тієї змінної передадуться вже данні в jsx де вони і потрібні.

// В данному випадку був зроблений костиль, який рендерив інший вміст на сторніці, поки запит ще не був оброблений (це стан useState, там де error, setError)/або якщо сказати по іншому - поки data ще не мала жодних даних (вона не може мати даних на першому рендері react, бо react рендерить все як найшвидше, в тому стартовому стані, в якому він це побачив на початку) рендерився інший вміст. А коли вже promise з запитом повертався, тоді вже рендерився вміст API.

// В данному випадку будуть 4 стани рендеру (при запиті стороннього API):
// 1 - ще нічого немає (data пустий)
// 2 - процес очікування даних (data також ще пуста)
// 3 - дані були отримані (і так, data навіть зараз пуста)
// 4 - дані були присвоєні змінній data (і вже в цьому випадку data не буде пустою змінною, в ній вже будуть данні зі стороннього API, які вже зможуть відрендеритись)

function Parser() {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const url = 'https://randomuser.me/api/?results=5'

    useEffect(() => {
        axios.get(url)
             .then((response) => {
                setData(response.data.results)
                setLoading(false) 
             })
             .catch(error => setError(error) )
    },[])

 console.log(data)

    if (loading) return (<h1>Loading in progress...</h1>)

    if (error) return (<h1>Error</h1>)

   
    return(
        <Box>
            <MainTable data = {data} />
        </Box>
    )

    





}
export default Parser







// export default getData
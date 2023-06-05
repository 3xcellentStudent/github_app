export default class CallDatabase{
   static async postToDB(pRoute, body){
      const adress = `http://localhost:5000/api/${pRoute}`
      const response = await fetch(adress, {
         method: 'POST',
         mode: 'cors',
         credentials: "include",
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(body)
      }).then(promise => promise.json()).then(data => data)
   
      return response
   }

   static async logout(pRoute, refreshToken){
      const adress = `http://localhost:5000/api/${pRoute}`
      const response = await fetch(adress, {
         method: 'POST',
         mode: 'cors',
         credentials: "include",
         headers: {
         'Set-Cookie': refreshToken,
         'Access-Control-Allow-Origin': '*',
         'Content-Type': 'text/html',
         },
      }).then(promise => promise.json()).then(data => data)
   
      if(response.deletedCount > 0) localStorage.removeItem('user')
      return response
   }

   static async getFromDB(route){
      const adress = `http://localhost:5000/api/${route}`
      const response = await fetch(adress, {
         method: 'GET',
         mode: 'cors',
         credentials: "include",
         headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
         },
      }).then(data => data.json())
   
      return response
   }

   static async getAnything(adress){
      console.log('adress', adress)
      const response = await fetch(adress, {
         method: 'GET',
         mode: 'cors',
      }).then(promise => promise.json()).then(data => data)
   
      return response
   }
}
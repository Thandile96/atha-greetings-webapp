module.exports = function greetings(pool){
   
    var greetedNames = {};

    function setName(name){
        
        var named = escape(name).toLowerCase()
        var index = named.charAt(0).toUpperCase();
        var del = named.slice(1)
        var name = index + del

        if(greetedNames[name] === undefined){
            greetedNames[name] = 1;
        }
        else {
            greetedNames[name]++
        }
    }

    function getNames(){
        return greetedNames;    
    }

    async function greetMe(language, name) {

        try {
        var named = escape(name).toLowerCase()
        var index = named.charAt(0).toUpperCase();
        var del = named.slice(1)
        var newName = index + del
       
        const query = await pool.query('select name from users WHERE name = $1', [newName])
        // console.log(query.rows);

        if(query.rowCount === 0){
            await pool.query('INSERT INTO users (name, counter) VALUES ($1, $2)', [newName, 1])
        }

        else {
            await pool.query('UPDATE users SET counter = counter +1 WHERE name = $1', [newName])
        }
        if(language === 'English') {
            return "Hello, " + newName;
        }

        else if(language === 'IsiXhosa'){
            return "Molo, " + newName;
        }
    
        else if(language === 'Sesotho'){
            return "Lumela, " + newName;
        }
        } catch (error) {
            console.log(error)
        }
    }
 
    async function counter(){
      var namesList = await pool.query('select * from users')
      return   namesList.rowCount;
    }

    function errorMsgs(language, name){
        if(name === "" && language === null){
            return "Please enter name and select language!";
        }
        else if(name !== "" && !language){
            return "Please select language!";
        }
               
        else if(name === "" && language !== null){
            return "Please enter name!";
        }        
       
    }

    async function resetCounter(){
        var resetIT = await pool.query('DELETE from users')
        return resetIT;

    }
    
    return {
        greetMe,
        setName,
        getNames,
        counter,
        errorMsgs,
        resetCounter
    }
}


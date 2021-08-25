module.exports = function greetings(existNames){
    
    var greetedNames = existNames || [];

    function setName(name){
        
        var named = escape(name).toLowerCase()
        var index = named.charAt(0).toUpperCase();
        var del = named.slice(1)
        var name = index + del

        if(!greetedNames.includes(name)){
            greetedNames.push(name)
        }
    }

    function getNames(){
        return greetedNames
    }

    function greetMe(language, name) {
        
        var named = escape(name).toLowerCase()
        var index = named.charAt(0).toUpperCase();
        var del = named.slice(1)
        var name = index + del

        if(language === 'English') {
            return "Hello, " + name;
        }

        else if(language === 'IsiXhosa'){
            return "Molo, " + name;
        }
    
        else if(language === 'Sesotho'){
            return "Lumela, " + name;
        }
    }
 
    function counter(){
      return   greetedNames.length;
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
    
    return {
        greetMe,
        setName,
        getNames,
        counter,
        errorMsgs 
    }
}

module.exports = function greetings(){
    
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
      var namesList = Object.keys(greetedNames);
      return   namesList.length;
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


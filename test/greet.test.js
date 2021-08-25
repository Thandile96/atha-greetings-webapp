 const assert = require('assert');
 const greetings = require('../greetFactory')
describe("The greet function", function(){

    it ("should greet a user in english when language selected is English", function(){
        const theGreetings = greetings();
        assert.equal("Hello, Lee", theGreetings.greetMe('English', 'Lee'));
    });

    it ("should greet a user in isiXhosa when language selected is isiXhosa", function(){
        const theGreetings = greetings();        
        assert.equal("Molo, Mel", theGreetings.greetMe('IsiXhosa', 'Mel'));
    });

    it ("should greet a user in Sesotho when language selected is Sesotho", function(){
        const theGreetings = greetings();        
        assert.equal("Lumela, Mel", theGreetings.greetMe('Sesotho', 'Mel'));
    });

    it("should return a greeting with the first letter of the greeted name in uppercase", function(){
        const theGreetings = greetings();
        assert.equal("Hello, Athi", theGreetings.greetMe('English', 'athi'));
    }); 
   
    it("should increment the counter when a user is greeted", function(){
        const theGreetings = greetings();
        theGreetings.setName("Bulie");
        theGreetings.setName("Lani");
        theGreetings.setName("Athi");

        assert.equal(3, theGreetings.counter());
    });
    
    it("should increment the counter when a user is greeted and should not count the same name morethan once", function(){
        const theGreetings = greetings();

        theGreetings.setName("Bulie");
        theGreetings.setName("Lani");
        theGreetings.setName("Athi");
        theGreetings.setName("Athi")
        theGreetings.setName("Athi");
        theGreetings.setName("Lizzy");
        theGreetings.setName("Athi");
        theGreetings.setName("Luu");

        assert.equal(5, theGreetings.counter());
    });

    it("should display 'Please enter name' when a user has not entered name on text input box", function(){
        const theGreetings = greetings();
        assert.equal("Please enter name!", theGreetings.errorMsgs('English', ''));
    
    });

    it("should display 'Please select language' when a user has not selected a language", function(){
        const theGreetings = greetings();
        assert.equal("Please select language!", theGreetings.errorMsgs(null, 'Thandi'));
    
    });

    it("should display 'Please enter name and select language' when a user has not entered name and selected a language", function(){
        const theGreetings = greetings();
        assert.equal("Please enter name and select language!", theGreetings.errorMsgs(null, ''));
    
    });

});

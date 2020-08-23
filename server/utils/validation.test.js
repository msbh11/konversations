const expect = require('expect');

const {isRealString} = require('./validation');

describe("is real string", function(){

    it("should reject non string value", function(){
        
        let res = isRealString(95);

        expect(res).toBe(false);
          
    });

    it("should reject string with only space ", function(){
        
        let res = isRealString('                  ');
        expect(res).toBe(false);
        
        
    });

    it("should allow string with non-space chars", function(){
        
        let res = isRealString('       95         ');
        expect(res).toBe(true);
        
        
    });
});
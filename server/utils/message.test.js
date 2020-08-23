let expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');


describe("Generate message", function(){

    it("should generate correct message object", function(){
        let from = "chat",
            text = "Some random text message"
            message = generateMessage(from, text)

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});    
    });
});

describe("Generate Location message", function(){

    it("should generate correct location object", function(){
        let from = "adam",
            lat = '15',
            lng = '20',
            url = `https://www.google.com/maps?q=${lat},${lng}`,
            message = generateLocationMessage(from, lat, lng);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});    
    });
});

const expect = require('expect');

const {Users} = require('./users');

describe('users', function(){

    let users;

    beforeEach(()=>{

         users = new Users();
         users.users = [
            {
                id: "1",
                name: "nod1",
                room: "office"

            },
            {
                id: "2",
                name: "nod2",
                room: "node js"
    
            },
            {
                id: "3",
                name: "nod3",
                room: "node js"
        
            }
        ]
    })

    it("should add new user", function(){

        let users = new Users();
        let user = {
            id: "#hisokdfdsfj",
            name: "nod",
            room: "node js"
        };

        let result = [users.addUser(user.id, user.name, user.room)];

        expect(result).toEqual([user]);
        
    });

    it("should return name for node js", function(){
        let usersList = users.getUserList('node js');

        expect(usersList).toEqual(['nod2','nod3']);
    });

    it("should return name for office", function(){
        let usersList = users.getUserList('office');

        expect(usersList).toEqual(['nod1']);
    });

    it("should return id for user", function(){
        let userId = '2';
            user = users.getUser(userId);

        expect(user.id).toEqual(userId);
    });

    it("should not return id for user", function(){
        let userId = '150';
            user = users.getUser(userId);

        expect(user).toBeUndefined();
    });

    it("should not remove a user", function(){
        let userId = '150';
            user = users.removeUser(userId);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);

    });

    it("should remove a user", function(){
        let userId = '1';
            user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);

    });



});
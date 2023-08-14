const game = require('../exercise1');

describe('fizzBuzz', ()=>{
    it('should return exception if not a number', ()=>{
        expect(()=> {
            game.fizzBuzz('a')
        }).toThrow();
        expect(()=> {
            game.fizzBuzz(null)
        }).toThrow();
        expect(()=> {
            game.fizzBuzz(undefined)
        }).toThrow();
        expect(()=> {
            game.fizzBuzz({})
        }).toThrow();
    });

    it('should return FizzBuzz if number divisible by 3 and 5 both', ()=>{
        const result = game.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if number divisible by 3', ()=>{
        const result = game.fizzBuzz(3);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if number divisible by 5', ()=>{
        const result = game.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return number if not divisble by either 3 or 5', ()=>{
        const result = game.fizzBuzz(1);
        expect(result).toBe(1);
    });
});
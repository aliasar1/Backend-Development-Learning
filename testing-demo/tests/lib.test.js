const lib = require('../lib');

// grouping related testws
describe('absolute', ()=>{
    it('should return a postive number if input is positive', ()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return a postive number if input is negative', ()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return a 0 if input is negative', ()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});


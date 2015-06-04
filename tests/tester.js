describe('Check Loaded Files', function() {
    var d = document.createElement('div');

    var willy = {son:"Edward"};

    it('Should exist', function() {
        expect(d.nodeName).toBe('DIV');
    });

    it('Have cute son?', function() {
        expect(willy.son).toBe('Edward');
    });

    it('Have another cute son?', function() {
        expect(willy.son).toBe('Briwa');
    });

});

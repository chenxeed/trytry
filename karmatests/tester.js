describe('Check Loaded Files', function() {
    var d = document.createElement('div');

    it('Should exist', function() {
        expect(d.nodeName).toBe('DIV');
    });
});

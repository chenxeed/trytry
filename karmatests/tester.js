describe('Check Loaded Files', function() {
    var d = document.querySelector('h1');

    it('Should exist', function() {
        expect(d.nodeName).toBe('H1');
    });
});

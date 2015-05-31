describe('getDiv', function() {
    var d = document.querySelector('.circle');

    it('Should exist', function() {
        expect(d.nodeName).toBe('DIV');
    });
});

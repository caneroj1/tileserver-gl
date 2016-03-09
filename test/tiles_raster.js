var testTile = function(prefix, z, x, y, format, status, scale, type) {
  if (scale) y += '@' + scale + 'x';
  var path = '/' + prefix + '/' + z + '/' + x + '/' + y + '.' + format;
  it(path + ' returns ' + status, function(done) {
    var test = supertest(app).get(path);
    test.expect(status);
    if (type) test.expect('Content-Type', type);
    test.end(done);
  });
};

describe('Raster tiles', function() {
  describe('existing tiles', function() {
    testTile('test', 0, 0, 0, 'png', 200, undefined, /image\/png/);
    testTile('test', 0, 0, 0, 'jpg', 200, undefined, /image\/jpeg/);
    testTile('test', 0, 0, 0, 'jpeg', 200, undefined, /image\/jpeg/);
    testTile('test', 0, 0, 0, 'webp', 200, undefined, /image\/webp/);

    testTile('test', 1, 1, 1, 'png', 200);

    testTile('test', 0, 0, 0, 'png', 200, 2);
    testTile('test', 0, 0, 0, 'png', 200, 3);
    testTile('test', 2, 1, 1, 'png', 200, 3);
  });

  describe('error tiles', function() {
    testTile('non_existent', 0, 0, 0, 'png', 404);
    testTile('test', -1, 0, 0, 'png', 404);
    testTile('test', 25, 0, 0, 'png', 404);
    testTile('test', 0, 1, 0, 'png', 404);
    testTile('test', 0, 0, 1, 'png', 404);
    testTile('test', 0, 0, 0, 'gif', 400);
    testTile('test', 0, 0, 0, 'pbf', 400);

    testTile('test', 0, 0, 0, 'png', 404, 1);
    testTile('test', 0, 0, 0, 'png', 404, 4);
  });
});

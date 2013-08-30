var videoView;

module('Unit - Video Template', {
  setup: function() {
    TestUtils.clearApp();
    videoView = TestUtils.createTemplateView('video');
  },
  teardown: function() {
    TestUtils.removeView(videoView);
  }
});

test('exists', 1, function() {
  var templates = TestUtils.lookupTemplateNames();
  ok(templates.contains('video'), 'does not exist');
});

test('has a video tag', 1, function() {
  equal(find('video').length, 1, 'does not contain one video tag');
});

test('video tag has required attributes', 4, function() {
  equal(find('video').attr('width'), '100%', 'width is not set to 100%');
  equal(find('video').attr('height'), '100%', 'height is not set to 100%');
  equal(find('video').attr('autobuffer'), '', 'autobuffer is not set to an empty string ""');
  equal(find('video').attr('preload'), 'auto', 'preload is not set to auto');
});

test('has source tags', 1, function() {
  equal(find('video source').length, 3, 'does not have three source tags');
});

test('has source tags with a src attribute', 1, function() {
  equal(find('source[src]').length, 3, 'does not have three source tags with src attributes');
});

test('source tags have the proper type attributes', 3, function() {
  equal(find('source[type="video/mp4"]').attr('type'), 'video/mp4', 'there is not a source tag with attribute type="video/mp4"');
  equal(find('source[type="video/webm"]').attr('type'), 'video/webm', 'there is not a source tag with attribute type="video/webm"');
  equal(find('source[type="video/ogg"]').attr('type'), 'video/ogg', 'there is not a source tag with attribute type="video/ogg"');
});
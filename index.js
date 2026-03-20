// AutoPipe Plugin: pdf-viewer
// PDF document viewer using browser-native embed
// Supported extensions: pdf

(function() {
  var _container = null;
  var _zoom = 100;

  function render(fileUrl, filename) {
    if (!_container) return;

    var html = '<div class="pdf-plugin">';

    // Controls
    html += '<div class="pdf-controls">';
    html += '<span class="pdf-filename">' + filename + '</span>';
    html += '<div class="pdf-zoom-controls">';
    html += '<button id="pdfZoomOut">−</button>';
    html += '<span class="pdf-zoom-label">' + _zoom + '%</span>';
    html += '<button id="pdfZoomIn">+</button>';
    html += '<button id="pdfZoomReset">Reset</button>';
    html += '</div>';
    html += '<a href="' + fileUrl + '" download="' + filename + '" class="pdf-download-btn">Download</a>';
    html += '</div>';

    // Embed
    html += '<div class="pdf-embed-wrap" style="height:' + (500 * _zoom / 100) + 'px">';
    html += '<embed src="' + fileUrl + '#toolbar=1&navpanes=1" type="application/pdf" width="100%" height="100%">';
    html += '</div>';

    html += '</div>';
    _container.innerHTML = html;

    // Events
    var zoomIn = _container.querySelector('#pdfZoomIn');
    var zoomOut = _container.querySelector('#pdfZoomOut');
    var zoomReset = _container.querySelector('#pdfZoomReset');
    if (zoomIn) zoomIn.addEventListener('click', function() { _zoom = Math.min(200, _zoom + 25); render(fileUrl, filename); });
    if (zoomOut) zoomOut.addEventListener('click', function() { _zoom = Math.max(50, _zoom - 25); render(fileUrl, filename); });
    if (zoomReset) zoomReset.addEventListener('click', function() { _zoom = 100; render(fileUrl, filename); });
  }

  window.AutoPipePlugin = {
    render: function(container, fileUrl, filename) {
      _container = container;
      _container.innerHTML = '<div class="ap-loading">Loading...</div>';
      _zoom = 100;
      render(fileUrl, filename);
    },
    destroy: function() {
      _container = null;
    }
  };
})();

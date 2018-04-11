(function() {
  var lineCount;
  var aside = document.getElementsByTagName("aside")[0];
  var main = document.getElementsByTagName("main")[0];

  function lineCountWrite() {
    aside.innerHTML = "";
    lineCount = main.clientHeight / 25;
    for (var i = 1; i <= lineCount; i++) {
      aside.insertAdjacentHTML("beforeend", "<span>" + i + "</span>");
    }
  }

  lineCountWrite();

  var codes = document.querySelectorAll(".code");
  codes.forEach(function(code) {
    code.insertAdjacentHTML("beforeend", "<span class='arrow'></span>");
  });

  var codeArrows = document.querySelectorAll(".code .arrow");
  codeArrows.forEach(function(arrow) {
    arrow.onclick = function() {
      var parent = this.parentNode;
      var selection = parent.getElementsByClassName('code-selection')[0];
      var content= parent.getElementsByClassName('code-content')[0];
      parent.classList.toggle('close');
      selection.classList.toggle('collapsed');
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
      lineCountWrite();
    };
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    })
    .then(function(registration) {
        console.log("Service Worker Registered");
    });
    navigator.serviceWorker.ready.then(function(registration) {
        console.log("Service Worker Ready");
    });
  }
})();

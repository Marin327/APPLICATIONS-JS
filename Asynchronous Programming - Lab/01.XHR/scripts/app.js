function loadRepos() {
   let url = 'https://api.github.com/users/testnakov/repos';
   const httpRequest = new XMLHttpRequest();

   httpRequest.addEventListener('readystatechange', ajaxHandler());
   httpRequest.open("GET", url);
   httpRequest.send();

   function ajaxHandler() {
       return function () {
           if (httpRequest.readyState === 4 && httpRequest.status === 200) {
               let data = JSON.parse(httpRequest.responseText)
               document.getElementById("response").textContent =
                   JSON.stringify(data,null, 2);
           }
       };
   }

}
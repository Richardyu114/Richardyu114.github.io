window.addEventListener("load",()=>{const e=()=>{document.body.style.cssText="width: 100%;overflow: hidden";document.querySelector("#algolia-search .search-dialog").style.display="block";document.querySelector("#algolia-search .ais-search-box--input").focus();btf.fadeIn(document.getElementById("search-mask"),.5);document.addEventListener("keydown",function e(a){if(a.code==="Escape"){t();document.removeEventListener("keydown",e)}})};const t=()=>{document.body.style.cssText="width: '';overflow: ''";const e=document.querySelector("#algolia-search .search-dialog");e.style.animation="search_close .5s";setTimeout(()=>{e.style.cssText="display: none; animation: ''"},500);btf.fadeOut(document.getElementById("search-mask"),.5)};const a=()=>{document.querySelector("#search-button > .search").addEventListener("click",e);document.getElementById("search-mask").addEventListener("click",t);document.querySelector("#algolia-search .search-close-button").addEventListener("click",t)};a();window.addEventListener("pjax:complete",function(){getComputedStyle(document.querySelector("#algolia-search .search-dialog")).display==="block"&&t();a()});const i=GLOBAL_CONFIG.algolia;const s=i.appId&&i.apiKey&&i.indexName;if(!s){return console.error("Algolia setting is invalid!")}const n=instantsearch({appId:i.appId,apiKey:i.apiKey,indexName:i.indexName,searchParameters:{hitsPerPage:i.hits.per_page||10},searchFunction:function(e){const a=document.querySelector("#algolia-search-input input");if(a.value){e.search()}}});n.addWidget(instantsearch.widgets.searchBox({container:"#algolia-search-input",reset:false,magnifier:false,placeholder:GLOBAL_CONFIG.algolia.languages.input_placeholder}));n.addWidget(instantsearch.widgets.hits({container:"#algolia-hits",templates:{item:function(e){const a=e.permalink?e.permalink:GLOBAL_CONFIG.root+e.path;return'<a href="'+a+'" class="algolia-hit-item-link">'+e._highlightResult.title.value+"</a>"},empty:function(e){return'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/,e.query)+"</div>"}},cssClasses:{item:"algolia-hit-item"}}));n.addWidget(instantsearch.widgets.stats({container:"#algolia-stats",templates:{body:function(e){const a=GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS);return"<hr>"+a+'<span class="algolia-logo pull-right">'+'  <img src="'+GLOBAL_CONFIG.root+'img/algolia.svg" alt="Algolia" />'+"</span>"}}}));n.addWidget(instantsearch.widgets.pagination({container:"#algolia-pagination",scrollTo:false,showFirstLast:false,labels:{first:'<i class="fas fa-angle-double-left"></i>',last:'<i class="fas fa-angle-double-right"></i>',previous:'<i class="fas fa-angle-left"></i>',next:'<i class="fas fa-angle-right"></i>'},cssClasses:{root:"pagination",item:"pagination-item",link:"page-number",active:"current",disabled:"disabled-item"}}));n.start();window.pjax&&n.on("render",()=>{window.pjax.refresh(document.getElementById("algolia-hits"))})});
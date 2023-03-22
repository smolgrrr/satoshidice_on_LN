var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

/* 

	Tablecloth 
	written by Alen Grakalic, provided by Css Globe (cssglobe.com)
	please visit http://cssglobe.com/lab/tablecloth/
	
*/

this.tablecloth = function(){
	
	// CONFIG 
	
	// if set to true then mouseover a table cell will highlight entire column (except sibling headings)
	var highlightCols = false;
	
	// if set to true then mouseover a table cell will highlight entire row	(except sibling headings)
	var highlightRows = true;	
	
	// if set to true then click on a table sell will select row or column based on config
	var selectable = true;
	
	// this function is called when 
	// add your own code if you want to add action 
	// function receives object that has been clicked 
	this.clickAction = function(obj){
		//alert(obj.innerHTML);
		
	};


	
	// END CONFIG (do not edit below this line)
	
	
	var tableover = false;
	this.start = function(){
		var tables = document.getElementsByClassName("data");
		for (var i=0;i<tables.length;i++){
			tables[i].onmouseover = function(){tableover = true};
			tables[i].onmouseout = function(){tableover = false};			
			rows(tables[i]);
		};
	};
	
	this.rows = function(table){
		var css = "";
		var tr = table.getElementsByTagName("tr");
		for (var i=0;i<tr.length;i++){
			css = (css == "odd") ? "even" : "odd";
			tr[i].className = css;
			var arr = new Array();
			for(var j=0;j<tr[i].childNodes.length;j++){				
				if(tr[i].childNodes[j].nodeType == 1) arr.push(tr[i].childNodes[j]);
			};		
			for (var j=0;j<arr.length;j++){				
				arr[j].row = i;
				arr[j].col = j;
				if(arr[j].innerHTML == "&nbsp;" || arr[j].innerHTML == "") arr[j].className += " empty";					
				arr[j].css = arr[j].className;
				arr[j].onmouseover = function(){
					over(table,this,this.row,this.col);
				};
				arr[j].onmouseout = function(){
					out(table,this,this.row,this.col);
				};
				arr[j].onmousedown = function(){
					down(table,this,this.row,this.col);
				};
				arr[j].onmouseup = function(){
					up(table,this,this.row,this.col);
				};				
				arr[j].onclick = function(){
					click(table,this,this.row,this.col);
				};								
			};
		};
	};
	
	// appyling mouseover state for objects (th or td)
	this.over = function(table,obj,row,col){
		if (!highlightCols && !highlightRows) obj.className = obj.css + " over";  
		if(check1(obj,col)){
			if(highlightCols) highlightCol(table,obj,col);
			if(highlightRows) highlightRow(table,obj,row);		
		};
	};
	// appyling mouseout state for objects (th or td)	
	this.out = function(table,obj,row,col){
		if (!highlightCols && !highlightRows) obj.className = obj.css; 
		unhighlightCol(table,col);
		unhighlightRow(table,row);
	};
	// appyling mousedown state for objects (th or td)	
	this.down = function(table,obj,row,col){
		obj.className = obj.css + " down";  
	};
	// appyling mouseup state for objects (th or td)	
	this.up = function(table,obj,row,col){
		obj.className = obj.css + " over";  
	};	
	// onclick event for objects (th or td)	
	this.click = function(table,obj,row,col){
		if(check1){
			if(selectable) {
				unselect(table);	
				if(highlightCols) highlightCol(table,obj,col,true);
				if(highlightRows) highlightRow(table,obj,row,true);
				document.onclick = unselectAll;
			}
		};
		clickAction(obj); 		
	};		
	
	this.highlightCol = function(table,active,col,sel){
		var css = (typeof(sel) != "undefined") ? "selected" : "over";
		var tr = table.getElementsByTagName("tr");
		for (var i=0;i<tr.length;i++){	
			var arr = new Array();
			for(j=0;j<tr[i].childNodes.length;j++){				
				if(tr[i].childNodes[j].nodeType == 1) arr.push(tr[i].childNodes[j]);
			};							
			var obj = arr[col];
			if (check2(active,obj) && check3(obj)) obj.className = obj.css + " " + css; 		
		};
	};
	this.unhighlightCol = function(table,col){
		var tr = table.getElementsByTagName("tr");
		for (var i=0;i<tr.length;i++){
			var arr = new Array();
			for(j=0;j<tr[i].childNodes.length;j++){				
				if(tr[i].childNodes[j].nodeType == 1) arr.push(tr[i].childNodes[j])
			};				
			var obj = arr[col];
			if(check3(obj)) obj.className = obj.css; 
		};
	};	
	this.highlightRow = function(table,active,row,sel){
		var css = (typeof(sel) != "undefined") ? "selected" : "over";
		var tr = table.getElementsByTagName("tr")[row];		
		for (var i=0;i<tr.childNodes.length;i++){		
			var obj = tr.childNodes[i];
			if (check2(active,obj) && check3(obj)) obj.className = obj.css + " " + css; 		
		};
	};
	this.unhighlightRow = function(table,row){
		var tr = table.getElementsByTagName("tr")[row];		
		for (var i=0;i<tr.childNodes.length;i++){
			var obj = tr.childNodes[i];			
			if(check3(obj)) obj.className = obj.css; 			
		};
	};
	this.unselect = function(table){
		tr = table.getElementsByTagName("tr")
		for (var i=0;i<tr.length;i++){
			for (var j=0;j<tr[i].childNodes.length;j++){
				var obj = tr[i].childNodes[j];	
				if(obj.className) obj.className = obj.className.replace("selected","");
			};
		};
	};
	this.unselectAll = function(){
		if(!tableover){
			tables = document.getElementsByTagName("table");
			for (var i=0;i<tables.length;i++){
				unselect(tables[i])
			};		
		};
	};	
	this.check1 = function(obj,col){
		return (!(col == 0 && obj.className.indexOf("empty") != -1));
	}
	this.check2 = function(active,obj){
		return (!(active.tagName == "TH" && obj.tagName == "TH")); 
	};
	this.check3 = function(obj){
		return (obj.className) ? (obj.className.indexOf("selected") == -1) : true; 
	};	
	
	start();
	
};

/* script initiates on page load. */
window.onload = tablecloth;


}
/*
     FILE ARCHIVED ON 23:16:05 Jan 28, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 21:05:25 Feb 02, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 66.431
  exclusion.robots: 0.174
  exclusion.robots.policy: 0.162
  cdx.remote: 0.094
  esindex: 0.013
  LoadShardBlock: 33.524 (3)
  PetaboxLoader3.datanode: 51.9 (4)
  CDXLines.iter: 22.368 (3)
  load_resource: 31.748
*/
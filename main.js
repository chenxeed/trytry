//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////// DEMONSTRATE HOW TO UPDATE SVG CIRCLE ATTRIBUTE ///////////////////////////////////////////////
/////////////////////// BY USING D3 //////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// append div.wrapper into body
var body = d3.select("body");
var title = body.append('h2').text('Update SVG attribute by data');
var circle_wrapper = body.append("div");
circle_wrapper.style("border","black solid 1px")
.style("width","500px")
.style("height","500px");
circle_wrapper.classed("wrapper circle", true);

// circle data
var data_circle = [
	{r:20, x:30, y:50, c:"green"},
	{r:50, x:230, y:50, c:"red"},
	{r:25, x:30, y:250, c:"blue"},
	{r:70, x:230, y:300, c:"yellow"},
];

// append the svg
var svg = circle_wrapper.append("svg")
.attr("width","500")
.attr("height","500")
;

var circle;
circle = svg.selectAll("circle").data(data_circle);
circle.enter().append("circle");

// function to update circle
function updateCircle(){
	circle = svg.selectAll("circle").data(data_circle);
	// remove any
	circle.exit().remove();
	circle.enter().append("circle");
	// want animation effect? just put transition() to give transition effect when value changes
	circle.transition().attr("r", function(d){ console.log('update R'); return d.r; })
	.attr("cx", function(d){ console.log('update X'); return d.x; })
	.attr("cy", function(d){ console.log('update Y'); return d.y; })
	.style("fill", function(d){ console.log('update C'); return d.c; });
}

// update circle
updateCircle();

// set input
var input_wrapper = body.append("div");
input_wrapper.classed("wrapper input", true).text("Circle Data Here");

var table = new Handsontable(input_wrapper[0][0], {
  data: data_circle,
  minSpareRows: 1,
  colHeaders: ["R","X","Y","Color"],
  contextMenu: true,
  columns: [
    {data: 'r', type: 'numeric'},
    {data: 'x', type: 'numeric'},
    {data: 'y', type: 'numeric'},
    {data: 'c'},
  ],
  afterChange: function(changes, source){
  	if(changes){
  		// Update the array data of circle
  		updateCircleData( this.getData() );
  		// Update the circle svg
	  	updateCircle();
  	}
  }
});

var data_circle_stringify = input_wrapper.append("div").style("width","180px").text(JSON.stringify(data_circle));

function updateCircleData( new_data ){
	// clone old data and get new one
	var old_data = _.clone( data_circle );
	data_circle = new_data;

	// compare the difference using lodash!
	var compare = _.difference(old_data, new_data);
	console.log('compare', old_data, new_data, compare);

	data_circle_stringify.text(JSON.stringify(data_circle));
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// COMPARE ANIMATION OF D3 and JQUERY//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// create the wrapper
var title = body.append('h2').text('Compare Animation between d3 and jQuery');
var anim_wrapper = body.append('div').classed('wrapper anim', true);

// d3 block
d3_block = anim_wrapper.append('div').classed('block',true).style('left', 0+'px');
// jquery block
jquery_block = $('<div/>').addClass('block').css('left',0);
$(anim_wrapper[0]).append(jquery_block);
// d3 text
d3_text = anim_wrapper.append('div').text('Hi I Am D3 Text').style('font-size', 20+'px');

var flag = 1;
var anim_button = body.append('button').text('Animate!').on('click', function(){
	if(flag){
		d3_block.transition().style('left',250+'px').duration(1000);
		jquery_block.stop().animate({left:250}, 1000);
		d3_text.transition().style('font-size', 36+'px').style('font-weight','bold').style('font-style','italic');
		flag=0;
	}else{
		d3_block.transition().style('left',0+'px').duration(1000);
		jquery_block.stop().animate({left:0}, 1000);
		d3_text.transition().style('font-size', 20+'px').style('font-weight','normal').style('font-style','normal');
		flag=1;
	}
});
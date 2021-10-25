jQuery(document).ready( function( $ ) {

$(window).load(function(){
            
    $(".twentytwenty-container[data-orientation!=\'vertical\']").twentytwenty({
      default_offset_pct:0.5,
      no_overlay:false,
      before_label:2005,
      after_label:2006 });
    $(".twentytwenty-before-label").html("");
    $(".twentytwenty-after-label").html("");
 });
} );

//D3

var glow = d3.selectAll(".page-header").append("svg")
		.attr("width", "100%")
		.attr("class", "glow");

	glow.append("circle")
		.attr("cx", "50%")
		.attr("cy", "36%")
		.attr("r", 20)
		.attr("fill", "white")
		.on("mouseover", function(){
			d3.select(this).transition()
				.duration(1700)
				.attr("fill", "yellow")
				.attr("r", 40);	
		})
		.on("mouseout", function(){
			d3.select(this).transition()
				.duration(800)
				.attr("fill", "white")
				.attr("r", 20)
				.attr("opacity", "1");
		})

/*var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;
*/

var width = document.getElementById('svg0').clientWidth;
var height = document.getElementById('svg0').clientHeight;

var marginLeft = 0;
var marginTop = 0;



//draw the svg1 and svg2 canvas for the map and city axon drawing


var svg0 = d3.select('#svg0')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg1 = d3.select('#svg1')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var svg2 = d3.select('#svg2')
    .append('g')
    .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

var clickShow = false;

var albersProjection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([(width/2), (height/2)]);


var path = d3.geoPath()
    .projection(albersProjection);

//import the data from the .csv file
d3.json('./cb_2016_us_state_20m.json', function(dataIn){
    console.log(dataIn);
    svg0.selectAll('path')
        .data(dataIn.features)
        .enter()
        .append('path')
        .attr('d', path)
        .attr('fill', 'gainsboro')
        .attr('stroke', 'white')
        .attr('stroke-width', 1)
        .on('mouseover', function(d){
            d3.select(this)
                .attr('fill', 'yellow');
        })
        .on('mouseout', function(d){
            d3.select(this)
                .attr('fill', 'gainsboro');
        });

    svg0.selectAll('circle')
        .data([{long:-71.0589, lat:42.3601}])//change to array of long and lat of cities;
        .enter()
        .append('circle')
        .attr('cx', function (d){
            return albersProjection([d.long, d.lat])[0];
        })
        .attr('cy', function (d){
            return albersProjection([d.long, d.lat])[1];
        })
        .attr('r', 5)
        .attr('fill', 'steelblue')
        .on('mouseover', function(d){
            d3.select(this)
                .transition()
                .duration(2000)
                .ease(d3.easeBounce)
                .attr('fill', 'red')
                .attr('r', 15)
                .attr('opacity', .8);

        })
        .on('mouseout', function(d){
            d3.select(this)
                .transition()
                .duration(2000)
                .ease(d3.easeBounce)
                .attr('fill', 'steelblue')
                .attr('r', 5)
                .attr('opacity', 1);
        })
        .on('click', function(d){

            clickShow = true;
            document.getElementById('welcomeForm').style.display = 'none';

            document.getElementById('cityForm').style.display = 'inline-block';
            document.getElementById('svgdiv1').style.display = 'inline-block';
            document.getElementById('svgdiv2').style.display = 'inline-block';
            document.getElementById('buttondiv').style.display = 'inline-block';

        });



});




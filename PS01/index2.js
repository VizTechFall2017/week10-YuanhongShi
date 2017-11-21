/*var width = document.getElementById('svg1').clientWidth;
var height = document.getElementById('svg1').clientHeight;
*/

var width = document.getElementById('svg0').clientWidth;
var height = document.getElementById('svg0').clientHeight;

console.log(height);

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



//map function for USA map
var albersProjection = d3.geoAlbersUsa()
    .scale(1000)
    .translate([(width/2), (height/2)]);


var path = d3.geoPath()
    .projection(albersProjection);



//variaty for the cities
var cityArrary = ['BOSTON IN MA',
    'NEW YORK IN NY',
    'CHICAGO IN CA',
    'LOS ANGELES IN IL',
    'PHOENIX IN AZ',
    'SEATTLE IN WA'];


//Downtown area position
var arrayList = [
    {long:-71.056612, lat:42.354175}
];





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



d3.select('select')
    .on('change', function(d){
        var selectCity = d3.select('select').property('value');






        drawMap(selectCity);




    });


function drawMap(selectCity){

    svg1.selectAll('path')
        .remove();
    svg1.selectAll('circle')
        .remove();

    svg2.selectAll('pattern')
        .remove();

    var widthSvg1 = document.getElementById('svg1').clientWidth;
    var heightSvg1 = document.getElementById('svg1').clientHeight;

    d3.json('./'+selectCity+'.json', function(dataIn){

        var center = d3.geoCentroid(dataIn);
        var scale  = 40000;
        var offset = [widthSvg1/2, heightSvg1/2];
        var projection = d3.geoMercator().scale(scale).center(center)
            .translate(offset);

        // create the path
        var pathCity = d3.geoPath().projection(projection);

        //console.log(dataIn);
        var pathMap= svg1.selectAll('path')
            .data(dataIn.features)
            .enter()
            .append('path')
            .attr('d',pathCity)
            .attr('fill', 'gainsboro')
            .attr('stroke', 'white')
            .attr('stroke-width', 1)
            .attr('data-toggle',"tooltip")
            .attr('title', function(d){

            })
            .on('mouseover', function(d){

            })
            .on('mouseout', function(d){
                d3.select(this)
                    .attr('fill', 'gainsboro');
            })
            .on('click', function(d){

            });

console.log('here');

        svg1.selectAll('circle')
            .data(arrayList)
            .enter()
            .append('circle')
            .attr('cx', function (d){
                return projection([d.long, d.lat])[0];
            })
            .attr('cy', function (d){
                return projection([d.long, d.lat])[1];
            })
            .attr('r', 5)
            .attr('fill', 'steelblue')
            .attr('data-toggle',"tooltip")
            .attr('title', 'CLICK ON ME!')
            .on('mouseover', function(d){
                console.log('show some thing');
                d3.select(this)
                //why this tooltip not work!

                    .transition()
                    .duration(3000)
                    .ease(d3.easeBounce)
                    .attr('fill', 'red')
                    .attr('r', 20)
                    .attr('opacity', .8)
                    .attr('stroke', 'white')
                    .attr('stroke-width', 0.5);

            })

            .on('mouseout', function(d){
                d3.select(this)
                    .transition()
                    .duration(3000)
                    .ease(d3.easeBounce)
                    .attr('fill', 'steelblue')
                    .attr('stroke', 'none')
                    .attr('r', 5);
            })

            .on('click', function(d){
                d3.select(this)
                    .attr('fill', 'red')
                    .attr('r', 10);
                d3.select('.background')
                    .transition()
                    .duration(3000)
                    .ease(d3.easeBounce)
                    .attr('opacity', 1);

            });

        $('[data-toggle="tooltip"]').tooltip();

    });


    var defs = svg2.append('defs');
    defs.append('pattern')
        .attr('id','bg')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', widthSvg1)
        .attr('height', heightSvg1)
        .append('image')
        .attr('xlink:href', function(d){
            return selectCity + '.png';

        })
        .attr('width', widthSvg1)
        .attr('height', heightSvg1)
        .attr('x', 0)
        .attr('y', 0);

    svg2.append('rect')
        .attr('class', 'background')
        .attr('width', widthSvg1)
        .attr('height', heightSvg1)
        .attr('fill', 'url(#bg)')
        .attr('opacity', 0);

}
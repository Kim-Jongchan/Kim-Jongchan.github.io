// <graph visualization>
console.log("hello");
// margin 
var margin = {top: 10, right: 10, bottom: 100, left: 100},
margin2 = {top: 430, right: 10, bottom: 20, left: 100},
width = 800 - margin.left - margin.right,
height =500 - margin.top - margin.bottom;
height2 = 500 - margin2.top - margin2.bottom;

// axis
// local variable will be used to save multiple x, y, line functions depending on the metric
var x = d3.local();
var y = d3.local();

var line = d3.local();
var metric_list = d3.local();



//Read the data
d3.json("data/owid-covid-data.json", function(udata) {
        // country name object
        // country code(alpha-3 code) as a key
        // country name as a value
        var name_object = {}
        for (const [key, value] of Object.entries(udata)){
            name_object[key] = value['location']

        }

        // country checkboxes
        var list_data = Object.entries(udata); // returns an array of a given object's own enumerable string-keyed property [key, value] pairs, (obejct to array)
        var country_result = d3.select(".CountrySearchResults")

        var labels = country_result.selectAll(".labels")
                        .data(list_data)
                        .enter()
                        .append("label")
                        .attr("tabindex","0")
                        .attr("class","CountryOption")
        var default_country = ["World"]
        
        labels.append("div")
                .attr("class","input-container")
                .append("input")
                    .attr("type","checkbox")
                    .attr("value", function(d){return d[0]} )
                    // check the default country's checkbox
                    .property("checked", function(d){return default_country.includes(d[1]['location']) ? true : false })

        var labels_container = labels.append("div")
                                    .attr("class","info-container")
                                    .append("div")
                                    .attr("class","labels-container")
        labels_container.append("div")
                        .attr("class","name")
                        .text(function(d){return d[1]['location']})


    // Update the class of selected options
    // And the updated class name will be used to track which input options are currently selected
    function update_class(item){          
        //closest: fine the closest specific('label') tag in parent tags
        //classed: one of the functions of d3 selection
        //         which adds "selected" to the original class name(true);
        //checked method checks whether the input element is checked or not. 
        
        if (item.checked) {
            d3.select(item.closest('label')).classed('selected', true);
        } else {
            d3.select(item.closest('label')).classed('selected', false); 
        };    
    }

    // initallize class name for the country list checkbox
    var country_list = document.querySelectorAll('.CountrySearchResults input');       
    country_list.forEach(update_class);
    //console.log(country_list);
    

    // initallize class name for metric radio buttons
    var metrics_list = document.querySelectorAll('.ControlOption label input');    
    metrics_list.forEach(update_class);
    
    // initallize class name for a checkbox meaning relative popultaion
    var relative = document.querySelectorAll('.RelativeOption label input');    
    relative.forEach(update_class);

 

    // data preprocessing
    // this function helps to keep track of current input values.
    function input(){
        var selected_metric = document.querySelectorAll('label.Option.Available.selected input')[0].value; // In order to call a class that has some spaces in its name, change those spaces into periods. 
        var selected_interval = document.querySelectorAll('.interval_container')[0].value;
        var selected_countries = document.querySelectorAll('label.CountryOption.selected input'); // multiple checkboxs
        selected_countries = Array.from(selected_countries); // change 'selected countries' into array
        selected_countries = selected_countries.map(function(e){return e.value;}) // get values of each element in the array
        var relative_selection = document.querySelectorAll('.RelativeOption label input')[0].checked; //  True or False
        return [selected_metric,selected_interval,relative_selection,selected_countries] // return as a list
    }
    
    // create a new dataset by filtering selected countries info  
    function data_preprocessing(selected_countries){

        
        var dataReady = selected_countries.map(function(name){
            return {
                "name" : udata[name]['location'],
                "values" : udata[name]['data'].map(function(d){
                    return {
                        "date":new Date(d['date']),
                        "total_cases": d['total_cases'] == null ? 0 : d['total_cases'],
                        "new_cases": d['new_cases'] == null ? 0 : d['new_cases'],
                        "new_cases_smoothed":d['new_cases_smoothed'] == null ? 0 : d['new_cases_smoothed'],
                        "total_cases_per_million" : d['total_cases_per_million'] == null ? 0 : d['total_cases_per_million'],
                        "new_cases_per_million":d['new_cases_per_million'] == null ? 0 : d['new_cases_per_million'],
                        "new_cases_smoothed_per_million":d['new_cases_smoothed_per_million'] == null ? 0 : d['new_cases_smoothed_per_million'],
                        "total_deaths":d['total_deaths']== null ? 0 : d['total_deaths'],
                        "new_deaths":d['new_deaths']== null ? 0 : d['new_deaths'],
                        "new_deaths_smoothed":d['new_deaths_smoothed'] == null ? 0 : d['new_deaths_smoothed'],
                        "total_deaths_per_million":d['total_deaths_per_million'] == null ? 0 : d['total_deaths_per_million'],
                        "new_deaths_per_million":d['new_deaths_per_million'] == null ? 0 : d['new_deaths_per_million'],
                        "new_deaths_smoothed_per_million":d['new_deaths_smoothed_per_million'] == null ? 0 : d['new_deaths_smoothed_per_million'],
                        "total_vaccinations":d["total_vaccinations"] == null ? 0 : d['total_vaccinations'],
                        "people_fully_vaccinated":d["people_fully_vaccinated"] == null ? 0 : d['people_fully_vaccinated'],
                        "new_vaccinations":d["new_vaccinations"]== null ? 0 : d['new_vaccinations'],
                        "new_vaccinations_smoothed":d["new_vaccinations_smoothed"]== null ? 0 : d['new_vaccinations_smoothed'],
                        "total_vaccinations_per_hundred":d["total_vaccinations_per_hundred"]== null ? 0 : d['total_vaccinations_per_hundred'],
                        "people_fully_vaccinated_per_hundred":d["people_fully_vaccinated_per_hundred"]== null ? 0 : d['people_fully_vaccinated_per_hundred'],
                        "new_vaccinations_smoothed_per_million":d["new_vaccinations_smoothed_per_million"]== null ? 0 : d['new_vaccinations_smoothed_per_million']

                    }
                })
            }
        });
        return dataReady
    }

    var selected_countries = input()[3];
    var dataReady = data_preprocessing(selected_countries);
    
    // metrics objects : 
    // a combination of current input values as a key
    // a corresponding metric as a value
    var metric_object = {
        "confirmed_cases-cumulative-false" : "total_cases",
        "confirmed_cases-new_per_day-false" : "new_cases",
        "confirmed_cases-7_day_rolling_average-false" : "new_cases_smoothed",
        "confirmed_cases-cumulative-true":"total_cases_per_million",
        "confirmed_cases-new_per_day-true" : "new_cases_per_million",
        "confirmed_cases-7_day_rolling_average-true" : "new_cases_smoothed_per_million",
        "confirmed_deaths-cumulative-false" : "total_deaths",
        "confirmed_deaths-new_per_day-false" : "new_deaths",
        "confirmed_deaths-7_day_rolling_average-false" : "new_deaths_smoothed",
        "confirmed_deaths-cumulative-true" : "total_deaths_per_million",
        "confirmed_deaths-new_per_day-true" : "new_deaths_per_million",
        "confirmed_deaths-7_day_rolling_average-true" : "new_deaths_smoothed_per_million",
        "vaccination-cumulative-false" : "total_vaccinations",
        "vaccination-new_per_day-false" : "new_vaccinations",
        "vaccination-7_day_rolling_average-false" : "new_vaccinations_smoothed",
        "vaccination-cumulative-true" : "total_vaccinations_per_hundred",
        "vaccination-7_day_rolling_average-true" : "new_vaccinations_smoothed_per_million",
        "full_vaccination-cumulative-false" : "people_fully_vaccinated",
        "full_vaccination-cumulative-true" : "people_fully_vaccinated_per_hundred"
    }
    // array of metrics
    var metrics = ["total_cases","new_cases","new_cases_smoothed",
    "total_cases_per_million","new_cases_per_million","new_cases_smoothed_per_million",
    "total_deaths","new_deaths","new_deaths_smoothed",
    "total_deaths_per_million","new_deaths_per_million","new_deaths_smoothed_per_million",
    "total_vaccinations","people_fully_vaccinated","new_vaccinations",
    "new_vaccinations_smoothed","total_vaccinations_per_hundred","people_fully_vaccinated_per_hundred",
    "new_vaccinations_smoothed_per_million"];
    
    // array of metrics related to vaccination 
    var vaccine_metrics = ["total_vaccinations","people_fully_vaccinated","new_vaccinations",
    "new_vaccinations_smoothed","total_vaccinations_per_hundred","people_fully_vaccinated_per_hundred",
    "new_vaccinations_smoothed_per_million"];
    
    // Smaller dataset(nested object) for interactive visualization
    // metric as a key
    // array of object as a value 
    // each element in the array (object) has
    // country name as a key
    // value object as a value 
    // the object containing values has
    // date as a key
    // metric value corresponding to the date as a value 

    // This dataset accelerate the process of searching a value 
    // correspoing to a metric 
    // by using dictionary(object) instead of list(original dataset) 
    function small_datasets(dataReady){
        
        var sdata_list = {};
        

        for (i=0; i<metrics.length; i++){
            var metric = metrics[i]
            
            var sdata = []
            
            for (j=0; j<dataReady.length; j++){
                
                var ssdata_values = []
                for (k=0; k<dataReady[j].values.length; k++){

                    str_date = dataReady[j].values[k]['date'].toString().slice(4,15)
                    ;
                    str_metric = dataReady[j].values[k][metric];
                    
                    ssdata_values.push([str_date,str_metric])
                }

                var ssdata_values_object = Object.fromEntries(ssdata_values);
                
                
                var ssdata = {

                    "name":dataReady[j].name,

                    "values": ssdata_values_object

                    }


                sdata.push( ssdata );
            
            }
            
            sdata_list[metric]= sdata; 
        
        }
        return sdata_list
    };

          
    var sdataset =small_datasets(dataReady);
    console.log(sdataset);
    console.log(dataReady);
    

    // select the svg object in the body of the page
    var svg = d3.select('#figures_container')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
    
 

    // we can select which graphs to show in the list of graphs defined in defs tag 
    // using use tag (both defs&use tag is in svg tag) 
    var defs = d3.select('#figures')
    var graphs = defs.selectAll("graphs")
                    .data(metrics) // create a graph per each metric
                    .enter()
                    .append("g")
                        .attr("transform","translate(" + margin.left + "," + margin.top + ")")
                        .attr("width", width)
                        .attr("height", height)
                        .attr("id", function(metric){ return metric })
                        .each(function(metric){ // use each instead of call (for multiple graphs)
                            //save x, y and line functions corresponding to each metric 
                            var tx = x.set(this,d3.scaleTime()
                                .range([0, width])
                                .domain(!vaccine_metrics.includes(metric)?[new Date(2020, 0, 22),new Date(2021, 3, 27)]:[new Date(2020, 11, 25),new Date(2021, 3, 27)]))
                           
                            
                            var ty = y.set(this, d3.scaleLinear()
                                .domain([0, maximum_search(tx,metric,sdataset)])
                                .range([height, 0]))

                            line.set(this, d3.line()
                                .x(function(d) { return tx(d['date']) >= 0 ?  tx(d['date']) : null })
                                .y(function(d) { return ty(d[metric])}))
                            
                            metric_list.set(this,metric);

                        })
    

    // color
    var myColor = d3.scaleOrdinal()
        .domain(dataReady.map(function(d){return d.name}))
        .range(d3.schemeSet2);
    // X axis
    graphs
        .append("g")
        .attr("class", function(metric){return "x_axis "+metric})
        .attr("transform", "translate(0," + height + ")")
        .each(function(metric){
            d3.select(this).call(
                d3.axisBottom(x.get(this))
                .ticks(5)
                .tickFormat(d3.timeFormat("%b %d %Y"))
            )
        })           
    // Y axis
    graphs
        .append("g")
        .attr("class", function(metric){return "y_axis "+metric})
        .each(function(metric){
            d3.select(this)
                .call(d3.axisLeft(y.get(this)))
            
        })  
    // Lines
    graphs
        .append("g")
        .attr("class",function(metric){return "lines "+metric})
        .selectAll("myLines")
        .data(dataReady)
        .enter()
        .append("path")
            .attr("class", function(d){return d.name}) //function(d){ return d.name }
            .attr("d", function(d){
                return line.get(this)(d.values) } )
            .attr("stroke", function(d){ return myColor(d.name) })
            .style("stroke-width", 2)
            .style("fill", "none")
                     
       
            
    //brush
    
    function create_brush(dataReady,sdataset){

        // we will use this function only for the current metric
        var inputs = input();
        var current_metric = metric_object[String(String(inputs[0])+"-"+String(inputs[1])+"-"+String(inputs[2]))]
        
        // delete old one ; whenever we change metric to see
        var old_brush = document.querySelectorAll("#brush")
        if (old_brush.length > 0){
            for (i=0; i<old_brush.length; i++){
                old_brush[i].remove()
            }
        };

        var graph_brush =d3.select("#figures_container")
                            .append("g")
                            .attr("transform","translate(" + margin2.left + "," + margin2.top + ")")
                            .attr("width", width)
                            .attr("height", height2)
                            .attr("id", "brush")
            
        // x scale function
        x2 = d3.scaleTime()
            .range([0, width])
            .domain(!vaccine_metrics.includes(current_metric)?[new Date(2020, 0, 22),new Date(2021, 3, 27)]:[new Date(2020, 11, 25),new Date(2021, 3, 27)])
        // y scale function
        y2 = d3.scaleLinear()
                .domain([0, maximum_search(x2,current_metric,sdataset)])
                .range([height2, 0])
        // line function 
        line2 = d3.line()
                .x(function(d) { return x2(d['date']) >= 0 ?  x2(d['date']) : null })
                .y(function(d) { return y2(d[current_metric])})
        // add x axis
        graph_brush
            .append("g")
            .attr("class", "brush_x_axis "+current_metric)
            .attr("transform", "translate(0," + height2 + ")")
            .call( 
                d3.axisBottom(x2)
                    .ticks(5)
                    .tickFormat(d3.timeFormat("%b %d %Y"))
                )

        // add Lines
        graph_brush
            .append("g")
            .attr("class","brush_lines "+current_metric)
            .selectAll("myLines")
            .data(dataReady)
            .enter()
            .append("path")
                .attr("class", function(d){return d.name}) //function(d){ return d.name }
                .attr("d", function(d){
                    return line2(d.values) } )
                .attr("stroke", function(d){ return myColor(d.name) })
                .style("stroke-width", 2)
                .style("fill", "none")
                            

        // defalut range of brush (from start to the end)
        var defaultSelection = [0, x2.range()[1]]; 
        
        // brush function
        const brush = d3.brushX()
                        .extent([[0, 0], [width, height2]])
                        .on("brush",brushed)
        
        // create a brush            
        graph_brush
            .append("g")
            .call(brush) // call the brush function below
            .call(brush.move,defaultSelection)

        function brushed() {
            
            // current graph
            var cur_graph = document.querySelector("#"+current_metric)
            
            // Get the selection coordinate
            extent = d3.event.selection   // looks like [ [12,11], [132,178]] 
            
            // change x domain
            x.get(cur_graph).domain([x2.invert(extent[0]),x2.invert(extent[1])]);
            
            // change y domain
            y.get(cur_graph).domain([0, maximum_search(x.get(cur_graph),current_metric,sdataset)]);
            
  
            // change line function
            line.get(cur_graph).x(function(d) { return x.get(cur_graph)(d['date']) >= 0 ?  x.get(cur_graph)(d['date']) : null })
            line.get(cur_graph).y(function(d) { return y.get(cur_graph)(d[current_metric])})

            
            // update x axis
            d3.select("#"+current_metric).select(".x_axis."+current_metric)
                                            .call(d3.axisBottom(x.get(cur_graph))
                                                        .ticks(5).tickSizeOuter(0)
                                                        .tickFormat(d3.timeFormat("%b %d %Y")));
            // update y axis                             
            d3.select("#"+current_metric).select(".y_axis."+current_metric).call(d3.axisLeft(y.get(cur_graph)));
            
            // update lines
            d3.select("#"+current_metric).select(".lines."+current_metric)
                                .selectAll("path")
                                .attr("d", function(d){
                                    return line.get(cur_graph)(d.values) } )
                                       
     
        }

                
            

    };
    create_brush(dataReady,sdataset);
            

    

    // Interactive graph visualization

    // maximum_search finds the largest value of the metric among selected countries

    function maximum_search(x, metric,sdataset){

        var global_max = null;
        
        var selected_countries = input()[3];
        // console.log(selected_countries);
        // getDaysArray returns an array of dates from start to end
        var getDaysArray = function(start, end) {
            // start's hour, seconds should be zero
            // because it is going to be used as key to find the corresponding value 
            var start_str = start.toString();
            var start = start_str.slice(0,16) + "00:00:00" + start_str.slice(24,);
            for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
                
                arr.push(new Date(dt).toString().slice(4,15));
            }
            return arr;
        };
        var dates_arr = getDaysArray(x.domain()[0],x.domain()[1])
        //console.log(dates_arr);
        for (i = 0; i < selected_countries.length; i++){
            //console.log(dates_arr.map(function(d){ return d;}))
            //console.log(sdataset[metric][i]['values'])

            //.log(dates_arr.map(function(d){ return sdataset[metric][i]['values'][d];}))
            var local_max = d3.max(dates_arr.map(function(d){ return sdataset[metric][i]['values'][d];}));
            console.log(local_max);
            if (global_max == null || global_max < local_max) {
                global_max = local_max
                
            }};   
        //console.log(global_max);
    return global_max;
        
    };


    // Tooltip with Mouse effects only for the selected graph

    // Tooltip
    function tooltip(dataReady,sdataset){
        
        
        // delete the nodes when the new input is selected 
        var tr_list = document.querySelectorAll("tr")    
        if (tr_list.length > 1){
            for (i=1; i<tr_list.length; i++){
                tr_list[i].remove()
            }
        };

        var old_effect = document.querySelectorAll(".mouse-over-effects")
        if (old_effect.length > 0){
            for (i=0; i<old_effect.length; i++){
                old_effect[i].remove()
            }
        };
        
        // legend table
        // create the number of rows corresponding to the number of selected countries
        var tooltip = d3.select("tbody")
            .selectAll("mytable")
            .data(dataReady)
            .enter()
            .append("tr")
            .style("color",function(d){ return myColor(d.name) })
            
        // first column : symbol
        tooltip.append("td")
            .append("div")
            .style("width","10px")
            .style("height","10px")
            .style("border-radius","5px")
            .style("background-color",function(d){ return myColor(d.name)})
           
        // second column : country name
        tooltip.append("td") 
            .style("padding-right","0.8em")
            .style("font-size","0.9em")
            .text(function(d){return d.name})
           
        // third column : value
        tooltip.append("td")
            .style("text-align","right")
            .style("white-space","nowrap")
            .attr("class","tooltip_values")
            

        // mouse 
        var inputs = input();
        var current_metric = metric_object[String(String(inputs[0])+"-"+String(inputs[1])+"-"+String(inputs[2]))]
    
        var graph = d3.select("#"+current_metric);
        var mouseG = graph
                        .append("g")
                        .attr("class", "mouse-over-effects");
        
        // black vertical line to follow mouse
        mouseG
            .append("path") 
            .attr("class", "mouse-line")
            .style("stroke", "black")
            .style("stroke-width", "0.5px")
            .style("opacity", "0");

        // draw circles on the lines at the current mouse location(date)
        var mousePerLine = mouseG.selectAll('.mouse-per-line')
                        .data(dataReady)
                        .enter()
                        .append("g")
                        .attr("class", "mouse-per-line");

        mousePerLine.append("circle")
            .attr("r", 3)
            .style("stroke", function(d) {
                    return myColor(d.name);
                })
            .style("fill", "none")
            .style("stroke-width", "1px")
            .style("opacity", "0")
           
        
        mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
            .attr('width', width) // can't catch mouse events on a g element
            .attr('height', height)
            .attr('fill','none')
            .attr('pointer-events', 'all')
            .on('mouseout', function() { // on mouse out hide line, circles and text
                
                //console.log(d3.selectAll(".tooltip_tools"));
                d3.select(".mouse-line")
                    .style("opacity", "0");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "0");
                d3.selectAll(".Tooltip")
                    .style("display","none");        

            })
            .on('mouseover', function() { // on mouse in show line, circles and text
                
                d3.select(".mouse-line")
                    .style("opacity", "1");
                d3.selectAll(".mouse-per-line circle")
                    .style("opacity", "1");
                d3.selectAll(".Tooltip")
                    .style("display","inline-block");
             
            })
            .on('mousemove', function() { // mouse moving over canvas
                var mouse = d3.mouse(this); // returns the array of coordinates x and y.
                // draw the vertical line
                d3.select(".mouse-line")
                    .attr("d", function() { // path d attribute (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d)
                        var d = "M" + mouse[0] + "," + height;
                        d += " " + mouse[0] + "," + 0;
                        return d;
                    });
                
                // move the tooltip
                d3.select(".Tooltip")
                    .style("left",function(){
                        if (mouse[0]>400){
                            var location = mouse[0]-100
                            var location = location.toString() +"px"
                            
                            return location
                        } else {
                            var location = mouse[0]+300
                            var location = location.toString() +"px"
                            
                            return location
                        }

                     
                    } )
                    
                // draw circles on the line
                d3.selectAll(".mouse-per-line circle")
                    .attr("transform", function(d,i){

                        var xDate = x.get(this).invert(mouse[0]);
                        var xDate_str = xDate.toString();
                        var new_xDate = xDate_str.slice(0,16) + "00:00:00" + xDate_str.slice(24,);
                        var new_xDate = new_xDate.slice(4,15);
                        //console.log(new_xDate);
                        var value_y = sdataset[current_metric][i]['values'][new_xDate];
                        //console.log(value_y);
                        var position_y = y.get(this)(value_y);
                        
                        if (!isNaN(position_y)){
                            return "translate("+mouse[0]+", "+position_y+")"
                        }
                        else {
                            return "translate("+mouse[0]+", 0)"
                        }


                    })

                // update values (the third column)
                d3.selectAll(".tooltip_values")
                    .text(function(d,i){

                        var xDate = x.get(document.querySelector("#"+current_metric)).invert(mouse[0]);
                        var xDate_str = xDate.toString();
                        var new_xDate = xDate_str.slice(0,16) + "00:00:00" + xDate_str.slice(24,);
                        var new_xDate = new_xDate.slice(4,15);
                        var value_y = sdataset[current_metric][i]['values'][new_xDate];
                        var new_date = xDate_str.slice(4,10) + ", " +  xDate_str.slice(11,15);

                        document.querySelector('.Tooltip table tbody tr td strong').innerText = new_date;
                        
                        var formatComma = d3.format(",")

                        return formatComma(value_y);

                    })
            
            
            
            
            })

     
            

    };
    tooltip(dataReady,sdataset);
    
    

     // Country List Change
     d3.selectAll('.CountrySearchResults input').on("change",function(){

        // selected countries before & after
        var before = input()[3]
        // class name update
        country_list.forEach(update_class);
        var after = input()[3]
        
        // the difference between before and after selecting a country
        var difference = before.filter(x => !after.includes(x));
        
        // new data of current countries; data processing
        var dataReady = data_preprocessing(input()[3])
        var sdataset =small_datasets(dataReady);


        if (difference.length == 0){ // when you add a country
            var difference = after.filter(x => !before.includes(x)); // newly selected country
           
            // add axis & line
            graphs.each(function(metric){
                
                var tx = x.set(this,d3.scaleTime()
                    .range([0, width])
                    .domain(!vaccine_metrics.includes(metric)?[new Date(2020, 0, 22),new Date(2021, 2, 14)]:[new Date(2020, 11, 25),new Date(2021, 2, 14)]))
           
                var ty = y.set(this, d3.scaleLinear()
                            .domain([0, maximum_search(x.get(this),metric,sdataset)])
                            .range([height, 0]))
                
                line.set(this, d3.line()
                            .x(function(d) { return tx(d['date']) >= 0 ?  tx(d['date']) : null })
                            .y(function(d) { return ty(d[metric])}))
            })
           
            var graphs_lines = d3.selectAll(".lines")    
            
            graphs_lines.selectAll("myLines")
                        .data(dataReady.filter(function(d){ 
                                return d.name == name_object[difference[0]] }))
                        .enter()
                        .append("path")
                            .attr("class", function(d){return d.name}) //function(d){ return d.name }
                            .attr("d", function(d){
                                //console.log(this.parentNode);
                                return line.get(this)(d.values) } )
                            .attr("stroke", function(d){ return myColor(d.name) })
                            .style("stroke-width", 2)
                            .style("fill", "none")
            
            tooltip(dataReady,sdataset); // new tooltip
            create_brush(dataReady,sdataset); // new brush

        }  else{ //uncheck country
            console.log(name_object[difference[0]].replace(" ","."));
            // delete paths of the unchecked country
            var paths = document.querySelectorAll("."+name_object[difference[0]].replace(" ","."))
            console.log(paths);
            if (paths.length > 0){
                for (i=0; i<paths.length; i++){
                    paths[i].remove()
                }
            };

            // update axis & line
            graphs.each(function(metric){
                
                var tx = x.set(this,d3.scaleTime()
                    .range([0, width])
                    .domain(!vaccine_metrics.includes(metric)?[new Date(2020, 0, 22),new Date(2021, 2, 14)]:[new Date(2020, 11, 25),new Date(2021, 2, 14)]))
           
                var ty = y.set(this, d3.scaleLinear()
                            .domain([0, maximum_search(x.get(this),metric,sdataset)])
                            .range([height, 0]))
                
                line.set(this, d3.line()
                            .x(function(d) { return tx(d['date']) >= 0 ?  tx(d['date']) : null })
                            .y(function(d) { return ty(d[metric])}))
            })
           
            tooltip(dataReady,sdataset);
            create_brush(dataReady,sdataset);
        }
       
      
    
    });


    
    // Metric change function
    d3.selectAll('.ControlOption label input').on("change",function(){
        

        // class name update
        metrics_list.forEach(update_class);
        
        

        // graph visulization
        var inputs = input();
        d3.select('use')
            .attr("href", "#"+metric_object[String(String(inputs[0])+"-"+String(inputs[1])+"-"+String(inputs[2]))])
        var dataReady = data_preprocessing(input()[3])
        var sdataset =small_datasets(dataReady);
        tooltip(dataReady,sdataset);
        create_brush(dataReady,sdataset);
        
    
    
    
    });

    // relative box selection change
    d3.selectAll('.RelativeOption label input').on("change",function(){
        

        // class name update
        relative.forEach(update_class);
        
    

        // graph visulization

        var inputs = input();
        d3.select('use')
            .attr("href", "#"+metric_object[String(String(inputs[0])+"-"+String(inputs[1])+"-"+String(inputs[2]))])
        var dataReady = data_preprocessing(input()[3])
        var sdataset =small_datasets(dataReady);
        tooltip(dataReady,sdataset);
        create_brush(dataReady,sdataset);
    
    });
    
    // interval dropdown change function

    d3.selectAll('.interval_container').on("change",function(){
        

        // graph visulization
        var inputs = input();
        d3.select('use')
            .attr("href", "#"+metric_object[String(String(inputs[0])+"-"+String(inputs[1])+"-"+String(inputs[2]))])
        var dataReady = data_preprocessing(input()[3])
        var sdataset =small_datasets(dataReady);
        tooltip(dataReady,sdataset);
        create_brush(dataReady,sdataset);

    });



    
}); // d3




        
        

 



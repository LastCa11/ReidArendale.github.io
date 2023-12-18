document.addEventListener("DOMContentLoaded", function() {
    d3.csv("https://raw.githubusercontent.com/LastCa11/DataScience0/main/Code%20Templates/js/data/fastfood_calories.csv")
    .then(data => {
      d3.select("#chart").html("");
        // Group data by restaurant and calculate average calories
        let sumCalories = {};
        let countItems = {};
        data.forEach(d => {
            d.calories = +d.calories;
            if (sumCalories[d.restaurant]) {
                sumCalories[d.restaurant] += d.calories;
                countItems[d.restaurant] += 1;
            } else {
                sumCalories[d.restaurant] = d.calories;
                countItems[d.restaurant] = 1;
            }
        });

        let avgCalories = [];
        for (let restaurant in sumCalories) {
            avgCalories.push({
                restaurant: restaurant,
                avgCalories: sumCalories[restaurant] / countItems[restaurant]
            });
        }

        const margin = {top: 20, right: 30, bottom: 40, left: 50},
            width = 800 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const x = d3.scaleBand()
            .range([0, width])
            .padding(0.1)
            .domain(avgCalories.map(d => d.restaurant));

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(avgCalories, d => d.avgCalories)]);

        const svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const bars = svg.selectAll(".bar")
            .data(avgCalories)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.restaurant))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.avgCalories))
            .attr("height", d => height - y(d.avgCalories))
            .attr("fill", "steelblue")
            .on("mouseover", function(d) {
                // Add a tooltip when hovering over a bar
                d3.select(this)
                    .attr("fill", "orange"); // Change bar color on hover
                const tooltip = d3.select("#chart").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
                tooltip.html(`${d.restaurant}<br>Avg Calories: ${d.avgCalories}`)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                // Remove tooltip and reset bar color on mouseout
                d3.select(this)
                    .attr("fill", "steelblue");
                d3.selectAll(".tooltip").remove();
            });
      

        // Add X axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

        // Add axis labels
        svg.append("text")
            .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Restaurant");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Average Calories");
    })
    .catch(error => {
        console.error('Error loading the CSV data: ', error);
      
    });
});
 const scatterMargin = {top: 20, right: 30, bottom: 40, left: 50},
            scatterWidth = 800 - scatterMargin.left - scatterMargin.right,
            scatterHeight = 400 - scatterMargin.top - scatterMargin.bottom;

        const scatterSvg = d3.select("#chart").append("svg")
            .attr("width", scatterWidth + scatterMargin.left + scatterMargin.right)
            .attr("height", scatterHeight + scatterMargin.top + scatterMargin.bottom)
            .append("g")
            .attr("transform", "translate(" + scatterMargin.left + "," + scatterMargin.top + ")");

        // Assuming 'xScale' and 'yScale' are defined based on your scatter plot data

        // Create the scatter plot
        const points = scatterSvg.selectAll(".point")
            .data(filteredData) // Use the processed data for the scatter plot
            .enter().append("circle")
            .attr("class", "point")
            .attr("cx", d => xScale(d.attributeX)) // Use appropriate data attributes
            .attr("cy", d => yScale(d.protein))
            .attr("r", 5)
            .attr("fill", d => colorScale(d.restaurant)) // Optional color coding

        // Add hover effect (tooltip) for scatter plot points
        points.on("mouseover", function(d) {
            // Tooltip logic for scatter plot points
            // ...
        })
        .on("mouseout", function() {
            // Hide tooltip logic
            // ...
        });

        // Add axes, labels, etc. for scatter plot
        // ...

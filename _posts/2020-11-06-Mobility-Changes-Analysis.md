---
layout: single
title:  "Mobility Changes During Pandemic"
categories:
  - Projects
tags:
  - Covid19

author_profile: true
read_time: false
comments: false
share: false
related: false


header:
  overlay_color: "#333"
  #caption: "Photo credit: [**Unsplash**](https://unsplash.com)"

toc : true
---

# Data mining on Mobility Changes During Pandemic across 10 Countries
### Goal : to cope with COVID19 situation by better understanding the changes in mobility during pandemic across 10 countries including:

- US 
- Canada
- Italy
- France
- UK
- Japan
- South Korea
- Australia
- Brazil
- India

#### Data Source

1. Mobility data  
    1) Google : [Mobility data from Google](https://www.google.com/covid19/mobility/)   
    
       Date of Download : 2020-10-20     
 
       These data show how the visitor (or time spent) of the classified place has changed compared to the base date. 
       The reference date represents the normal value of the day of the week . 
       The base date is the median of the 5-week period from January 3rd to February 6th, 2020.
   
    2) Apple : [Mobility data from Apple](https://covid19.apple.com/mobility)
       
       These data show the relative values of routing requests by country/region, subregion, or 
       city compared to January 13, 2020.

2. Covid data : [WHO COVID 19 global data](https://covid19.who.int/table)

## COVID19 Analysis
### The total number of confirmed cases in each countries
There are 3 noticeable countries which are the United States, India, and Brazil. And the US tops the list with 8 million confirmed cases.
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/29.embed"></iframe>

### The number of daily cases
-	In India and Brazil, It has increased steadily, but it is now on a decline 
-	But in the case of the US, after the second wave, it is on the rise again.
-	And there is a sudden spike in France, the UK, and Italy  
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/31.embed"></iframe>

### The number of daily cases by country
Since there are big differences in the number of confirmed cases between countries, let’s break down the above graph by country.
If you look at the shape of the graphs above, the 10 countries can be divided into 4 groups depending on what phase each country is currently in.

 1) In the first wave  
    - India  
    - Brazil   

 2) In the middle of second wave    
    - United Kingdom  
    - Italy  
    - France  
    - Canada  
            
 3) At the End of second wave  
    - Republic of Korea  
    - Japan  
    - Australia  
    
 4) In the middle of third wave    
    - United States
<iframe width="900" height="3000" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/33.embed"></iframe>

## Mobility Analysis
### Relative Frequency of Driving
This blue line means baseline, 100%.  
Driving frequency fell sharply before May in all countries.  
And some countries quickly returned to the baseline and even went higher than the baseline up to 200% around August.  
But South Korea still maintains mobility around 60 to 70% of the baseline. 
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/38.embed"></iframe>


### Relative Frequency of Walking
Walking frequency shows a similar pattern with driving frequency.
But the walking frequency reached the normal level after the driving frequency reached the baseline.
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/42.embed"></iframe>

<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/53.embed"></iframe>

### Then the next question is where so many people have gone
As you can see from this graph, Retail and recreation and workspace frequency hasn’t reached the normal level in all countries. 
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/44.embed"></iframe>

<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/48.embed"></iframe>

All countries other than South Korea haven’t reached the baseline of the transit station sector.  
So, It’s not the answer.  
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/50.embed"></iframe>


The Grocery and pharmacy frequency returned to around 90 to 110% of the baseline. But It can’t explain the amount of movement that exploded in certain countries.   
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/61.embed"></iframe>

Now we can see that the demand for parks has exploded in some countries including France, Italy, Canada, UK and the US. 
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/55.embed"></iframe>

By looking at the minimum frequency, we can see that transit station and Retail/Recreation appeared to be the most affected location and Park and Grocery/Pharmacy appeared to be the least affected location.   
Also, South Korea appeared to be the least affected country in terms of the movement, and Italy appeared to be the most affected country.
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/57.embed"></iframe>

Lastly, we are going to look at the relationship between New cases and Walking frequency in the US.
There seems to be a negative correlation between the number of new cases and walking frequency
But the frequency didn’t decrease as much as the last time, weakening the negative correlation.
<iframe width="900" height="400" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/59.embed"></iframe>


## Conclusion
Driving frequency came back to the baseline earlier than Walking frequency.
This result may have been influenced by the fact that people prefer personal and safe spaces like their cars rather than walking around during pandemic.

Also COVID19 has negatively affected mobility in most locations but parks.
Therefore, It seems that parks have significant roles and matter more than ever during this pandemic. 

And Its impact on mobility has been decreasing around the world. 



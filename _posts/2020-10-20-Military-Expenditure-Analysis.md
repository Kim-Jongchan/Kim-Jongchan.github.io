---
layout: single
title:  "Military Expenditure Analysis"
categories:
  - Data Analysis
tags:
  - Military

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

# Data mining on Military Spending across 10 Countires
### Goal : to better understand military expenditure over the past five years(2014-2018) for ten countries including:

- US 
- China
- Russia
- Germany
- UK
- France
- Italy
- Saudi Arabia
- S.Korea
- Israel

### Source of Data : Worldbank
Last update date: 8, Sep, 2020

- [GDP (current USD)](https://data.worldbank.org/indicator/NY.GDP.MKTP.CD) 
- [Military expenditure (current USD)](https://data.worldbank.org/indicator/MS.MIL.XPND.CD) 
- [Population,total](https://data.worldbank.org/indicator/SP.POP.TOTL) 

### GDP vs Military spending between countries
there are two outliers, which are USA and china in GDP and military expenditure. Without these outliers, Israel shows less GDP and military costs than other countries.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/1.embed"></iframe>

### Absolute Military spending
The graph also confirms that the U.S. and china are spending noticeably higher military costs than other countries.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/3.embed"></iframe>

### Percentage of Military spending over countries
Together, the two countries account for nearly 70 percent of the total military costs.
Above all the percentage of China’s military spending out of 10 countries is steadily increasing from 16 to 19 percent.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/5.embed"></iframe>

### Relative Military spending over GDP
But given the military spending relative to GDP,  Saudi Arabia tops the list.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/7.embed"></iframe>

### Relative Military spending over GDP for 5 years
If we put them together over years by country, It can be divided into 3 clusters by relative military expenditure. 
-	Frist Saudi Arabia is an unrivaled group with relative military cost ranging from approximately 10 to 12 percent.
-	The Second group consists of Russia and Israel, USA with a relative cost of 3 to 6 percent.
-	The rest of the world can be tied to approximately 2 per cent or less.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/9.embed"></iframe>

### GDP per-capita vs Military spending per-capita
By dividing the GDP and military costs of the first graph by the number of people, we can get a per capita GDP and per capita military spending graph below.
By identifying the location changes of each country, It can be seen that the three countries have been greatly influenced by the population, which are China ,Russia, and Isreal. 
As can be seen from the location of the circle, 
-	Russia and China have significantly lower GDP per capita than other countries 
-	China has lowest military spending per capita because of the relatively large population
-	Israel ranked second in terms of military spending per capita because of its small population
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/11.embed"></iframe>

### Military spending per-capita
As color suggests, 10 countries can be divided into three groups based on military spending per capita.
	- high : Saudi Arabia, USA, Isreal
	- low : china
	- middle : other countries
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/13.embed"></iframe>

### Annual Average Growth
China and the United states show noticeably high average annual growth 
China is increasing its military spending by an average of 12.3 billion dollars a year.
And the U.S. military expenditure is increasing by an average of 9.7 billion dollars a year
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/17.embed"></iframe>

### Compound Annual Growth Rate
On the other hand, based on the compound annual growth rate, which is the popular measure of an investment's annual growth rate over time, china topped the list with 5.6 percent, while the US came in fourth with 1.5 percent.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/19.embed"></iframe>

### Predicted Military Expenditure(Linear)
First of all, assuming that military spending increase linearly each year based on the result of linear regression, It takes about 150 years from now for US military spending to be caught up by China.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/21.embed"></iframe>

### Predicted Military Expenditure(Exponential)
However, assuming exponential growth with compound annual growth rate, It can be expected that it will take about only 23 years.
<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/25.embed"></iframe>

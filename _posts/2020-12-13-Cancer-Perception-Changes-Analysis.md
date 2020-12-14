---
layout: single
title:  "Changes in Public Perception of Cancer Prevention"
categories:
  - Projects
tags:
  - Cancer

author_profile: true
read_time: false
comments: false
share: false
related: false


header:
  overlay_color: "#333"
  #caption: "Photo credit: [**Unsplash**](https://unsplash.com)"

#toc : true
---

# Data mining on which groups of people are most susceptible to believing that cancer is not preventable and how it changes over the past 5 years


## *Introduction to Dataset*  

### What is HINTS?  

The Health Information National Trends Survey (HINTS) regularly collects nationally representative data about the American public’s knowledge of, attitudes toward, and use of cancer- and health-related information.
HINTS data are used to monitor changes in the rapidly evolving fields of health communication and health information technology and to create more effective health communication strategies across different populations.  
[More Details about HINTS](https://hints.cancer.gov/data/download-data.aspx/)  

### Target Feature

The target feature ('preventnotpossible') consists of four labels: strongly disagree, somewhat disagree, somewhat agree, and strongly agree. These are the answers to the question, “How much do you agree or disagree: There’s not much you can do to lower chances of getting cancer.”

### Data Preprocessing

5 data sets from 2015 to 2019 were concatenated into a single dataset and rows without the target feature were deleted. As a result, there were 16,554 responses(rows) and 81 common features(cols) over the years.   




## *Data Analysis*

### Percentage of each belief group by year
- Majority of people believe that cancer is preventable, accounting for 74% in 2016.  
- But the percentage fell almost 10% in 2018 and it’s on the rise in 2019.

<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/65.embed"></iframe>

### Percentage of each belief group by gender
- There is no huge difference in the percentage between male and female.

<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/67.embed"></iframe>

### Percentage of each belief group by Income Level

- As income increases, sizes of purple and red boxes are getting bigger, which means people are more likely to believe cancer is preventable.  

- And this pattern remains steady every year.  

<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/69.embed"></iframe>


### Changes in Percentage of ‘Strongly Disagree’ group by Income Level  

- Only people with income equal or greater than 200,000 dollars shows an increase in 2018.  
- Also, this graph shows that the gap between the Income groups had widened since 2015.

<p align="center">
  <img width="900" height="800" src="..\..\assets\images\Cancer_prevention\strong_disagree_by_income_and_year.png">
</p>


### Changes in Percentage of ‘Strongly Agree’ group by Income Level  

- There is a noticeable increase in the group of people with income lower than 10,000 dollars. 
- Also, this graph confirms that the gap between the Income groups had widened since 2015.

<p align="center">
  <img width="900" height="800" src="..\..\assets\images\Cancer_prevention\strong_agree_by_income_and_year.png">
</p>

### Percentage of each belief group by level of education
- As education increases, sizes of purple and red boxes are getting bigger, which means people are more likely to believe cancer is preventable.
- And this pattern remains steady every year.

<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/73.embed"></iframe>


### Difference in Age between belief groups

- There is no huge difference in age between groups.
- But “somewhat agree” group shows relatively low average age than other groups.

<p align="center">
  <img width="900" height="800" src="..\..\assets\images\Cancer_prevention\age_dist_by_group.png">
</p>

### Difference in PHQ4 between Level of Beliefs

- PHQ4 is a brief measure of depression and anxiety.  
- People who believe there’s nothing we can do to reduce the risk of cancer are more likely have depression and anxiety.


<iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~whdcksgogo12/75.embed"></iframe>


## Conclusion
Education, Income, Age and PHQ4 have a relationship with beliefs on cancer prevention.  
Those with lower levels of education and low incomes are more likely to believe that cancer is not preventable than their couterparts.   
And the gap between the groups have increased since 2015.   
Also, people who believe there’s nothing we can do to reduce the risk of cancer are more likely be depressed and have anxiety.  

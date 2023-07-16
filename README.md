# Automaker Stock Data

# Topic
- Automanufacturer stock price changes following the IPO of Tesla (2010-2022)
  
### Please see our proposal [here](https://github.com/SavannahWithAnH/TopAutomakersStock_Visualizations/blob/main/Group%204%20Proposal.docx) and select 'View raw'.

# Contributors & Responsibilities
- Alex Kopp - Python/Flask App
- Andrew Skorupa - SQL/Entity Relational Diagram
- Savannah Porter - Data Conversions/Javascript/Bar & Line Charts
- Mohamed Abou elkhier - HTML/CSS/Map
 
## Click [here](https://www.kaggle.com/datasets/prasertk/top-48-automakers-daily-stock-prices-20102022) to view one of our datasets at it's source!

# Deliverables
- What companies have gained the most market capitalization?
- What companies have lost the most market capitalization?
- Where are companies located? 

# Data collection, cleaning, analysis, and visualization tools
- SQL to query creating tables, joining the data, and creating presentable output.
    - PART 1: Datebase and table setup
    - PART 2: Data validation and exploration
    - PART 3: Data Analysis:
        - Ranking companies excluding Tesla.
        - Finding the top ten countries by market capitalization.
        - Querying data specifically for Tesla.
        - Calculating market capitalization using share price and volume information.

- Python to clean and convert csv files to json.

- CSS for styling and we broke it down to 3 PARTS
    - Part 1: This section sets up basic HTML and body settings like setting the height to 100%. It also sets up the #map element's height and width.
    - Part 2: This section includes styles for specific elements or classes.We define the dimensions for the .img-flag class, styles for the .well class, etc.
    - PART 3: This part of your CSS code includes the styles for the .exit-button class which is a button in the map to zoom out to original view.

- HTML for constructing the web page which divided to 3 sections:
    - Header : it includes doctype, metadta and various sylesheets and scripts.
    - Stylesheets: bootstrap for web design ,Leaflet for interactive map and local style. css file
    - Body content : It includes containers for our map, line chart, and bar chart. It also has a drop-down selector and information panel.
    - Scripts: jQuery , and the local javascript file leaflet-timeline-slider.js

- Java Script: we used Jave Script for our web development. Our repo cintains 3 JavaScript files:
    - automakers.js:

    - infoMap.js: This JavaScript code mainly functions to generate an interactive map using the Leaflet library. It visualizes different car manufacturers around the globe. The map's primary features include customized marker icons based on company rankings, a timeline slider, and an 'exit' button to revert the map to the initial view.

    



    - leaflet-timeline-slider.js


- Plotly for interactive bar and line graphs visualizing stock price changes over time.  
- Javascript utilizing 'd3', HTML, and CSS to create and display interactive graphs & charts with proper formatting.
- Flask app using 'render_template' to serve up the dashboard and jsonify to pull in data files enabling dashboard.

### [Entity Relational Diagram](https://github.com/SavannahWithAnH/TopAutomakersStock_Visualizations/blob/main/SQL/ERD.png)
<br>

<img width="595" alt="image" src="https://github.com/SavannahWithAnH/TopAutomakersStock_Visualizations/assets/126124356/bb2230c1-9f88-423b-8259-35d8abaaa8ef">
<img width="575" alt="image" src="https://github.com/SavannahWithAnH/TopAutomakersStock_Visualizations/assets/126124356/a2b2cc19-164d-48fe-8eae-833d57e3d228">
<br>
<br>

**Please visit our individual Github pages below**  
[Alex Kopp](https://github.com/alexkopp12)  
[Andrew Skorupa](https://github.com/AndyMSkor)  
[Savannah Porter](https://github.com/SavannahWithAnH)  
[Mohamed Abou elkhier](https://github.com/nabroo101)  
 

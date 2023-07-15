--PART 1 Datebase and table setup
--createing a table named market_cap_rank and populate it with data.
create table market_cap_rank (
	Market_Cap_Rank INT,
	Company_Name varchar,
	Company_Symbol varchar Primary Key,
	Market_Cap bigint,
	Stock_Price numeric,
	Country varchar);
---------------------------------------------------------------------

--PART 2 Data validation and exploration
--make sure data is there from table 1	
select * from market_cap_rank;

select *
from market_cap_rank
where country = 'Japan';

--make sure data is there from table 2
select * from high_low;


--make a better, more organized table
select High_Low.The_Date as "Date",
		High_Low.Stock_Symbol as "Symbol",
		Market_Cap_Rank.Company_Name as "Company Name",
		Market_Cap_Rank.country as "Country",
		High_Low.Adj_Close as "Adjusted Close",
		High_Low.Stock_Close as "Close",
		High_Low.Price_High as "Highest Price",
		High_Low.Price_Low as "Lowest Price",
		High_Low.Price_Open as "Opening Price",
		High_Low.Share_Volume as "Volume"
from High_Low
join Market_Cap_Rank
on High_Low.Stock_Symbol = Market_Cap_Rank.Company_Symbol
Order By High_Low.The_Date DESC, High_Low.Share_Volume DESC;
----------------------------------------------------------------------------

--PART 3 Data Analysis
--without Tesla
select market_cap_rank - 1 AS "New Rank",
		market_cap_rank as "Old Rank",
		company_name,
		company_symbol,
		market_cap,
		country
from Market_Cap_Rank
where company_name <> 'Tesla';


--top ten countries by market cap for anlysis
select  market_cap as "Market Cap",
		country as "Country",
		company_symbol as "Company"
from market_cap_rank
order by market_cap desc
LIMIT 10;


select company_name as "Company Name",
		company_symbol as "Stock Symbol",
		market_cap as "Market Capitalization"
from market_cap_rank
Limit 10;


--Tesla Grouped
select the_date, stock_symbol, share_volume
from high_low
where the_date > '2010-01-01' and the_date < '2010-12-31'
and stock_symbol = 'TSLA';


--math with market cap (seeing market cap through the years)
select the_date as "Date",
		stock_symbol as "Symbol",
		floor(price_high) * floor(share_volume) as "Market Capitalization"
from high_low
where stock_symbol = 'TSLA';
-----------------------------------------------------------------------------------
 

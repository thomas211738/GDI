
# FitRec Crowd Forecast  

## Overview

Get live crowd traffic at Fitrec, and see future predicted crowd traffic up to 3 months ahead. By analyzing historical swipe-in logs and simulating user behavior, the system forecasts crowd levels for the entire **2026 calendar year**. It accounts for semester schedules, holidays, and daily peak shifts to address inefficient workout planning.


## Inspiration

1) BU's gym traffic can be highly variable and difficult to predict. Students often encounter:

- Long equipment wait times  
- Gym anxiety from overcrowding  
- Wasted trips to a full facility  


2) <span style="color:blue; text-decoration:underline;">[Existing tools](https://www.bu.edu/fitrec/peak-quiet-hours/) lack granularity and can be difficult to understand.</span>

Peek-Quiet Hours by Fitrec as of Jan 26, 2026
![FitRec Peak Hours Chart](./frontend/public/ReadMe_Pics/Existing%20Tools%20Pic.png)

---

## Solution

I got raw Fitrec Swipe in data, and used that to make a model to predict future traffic.

### Key Features

- **Behavioral Simulation**  
  Monte Carlo simulation estimates swipe-out times using a statistical distribution of workout durations.

- **Context-Aware Modeling**  
  A **Random Forest Regressor** learns non-linear relationships between time, date, and crowd density.

- **Schedule Logic Integration**  
  Academic calendar parsing automatically adjusts predictions for holidays, intersessions, and closures (e.g. enforcing 0 occupancy on days like Thanksgiving).

**Why it works:**  
The model understands context, not just averages. For example, 5 PM in July is fundamentally different from 5 PM in January.

---

## Main Insights

From my data exploration, these are the 3 main insights I found. 

### 1. Time of Day: The "Two-Peak" Pattern
Gym traffic follows a predictable daily rhythm with two major spikes.
![FitRec Peak Hours Chart](./frontend/public/ReadMe_Pics/Hours%20Trend.png)
- **Morning (7:00 AM - 9:00 AM):** A sharp increase as the gym opens and people work out before class/work.
- **After Class Surge (5:00 PM - 7:00 PM):** The busiest time of the day, when the gym hits maximum capacity.
- **Quiet Afternoons (12:00 PM - 2:00 PM):** A moderate dip, making it a decent time to go.

### 2. Day of Week: The "Resolution" Curve
Traffic is highest at the start of the week and steadily declines.
![FitRec Peak Week Chart](./frontend/public/ReadMe_Pics/Weeks%20Trend.png)
- **Mondays & Tuesdays:** The busiest days as motivation is high.
- **Fridays:** Significantly quieter as the weekend approaches.
- **Weekends:** The lowest traffic of the week. Sundays are slightly busier than Saturdays, often picking up in the evening.

### 3. Month of Year: Academic Seasonality
As a university gym, traffic is dictated by the academic calendar.
![FitRec Peak Months Chart](./frontend/public/ReadMe_Pics/Months%20Trend.png)
- **January & February:** Peak season due to "New Year's Resolutions" and the start of the semester.
- **May - August:** A massive drop-off during Summer Break.
- **September:** A sharp resurgence as students return for the Fall semester.
- **December:** A sudden drop during Finals Week and Winter Break.

## Results

The model produces a **365-day smart calendar** for gym-goers.

### Model Performance

- **RMSE:** ~66  
  *(Predictions within ±66 people of actuals)*  
- **R² Score:** 0.69  
  *(Explains ~70% of traffic variance)*

---

## Future Improvements

1. **Weather Integration**  
    Correlate rain/snow with gym usage via weather APIs
2. **Real-Time Adjustment**  
    Introduce a feedback loop using live swipe data

## Author
**Thomas Yousef**


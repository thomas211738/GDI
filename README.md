
# FitRec Crowd Forecast  

## Overview

Get live crowd traffic at Fitrec, and see future predicted crowd traffic up to 3 months ahead. By analyzing historical swipe-in logs and simulating user behavior, the system forecasts crowd levels for the entire **2026 calendar year**. It accounts for semester schedules, holidays, and daily peak shifts to address inefficient workout planning.


## Inspiration

BU's gym traffic can be highly variable and difficult to predict. Students often encounter:

- Long equipment wait times  
- Gym anxiety from overcrowding  
- Wasted trips to a full facility  

### The Motivation

Existing tools lack granularity and fail to account for academic context such as **Finals Week vs. Spring Break**.

**Core Engineering Constraint:**  
The raw dataset contained **only entry timestamps (swipe-ins)** with **no exit data**, making direct occupancy calculation impossible.

---

## Solution

An end-to-end predictive system was built to **reconstruct missing data** and forecast future traffic.

### Key Features

- **Behavioral Simulation**  
  Monte Carlo simulation estimates swipe-out times using a statistical distribution of workout durations.

- **Context-Aware Modeling**  
  A **Random Forest Regressor** learns non-linear relationships between time, date, and crowd density.

- **Schedule Logic Integration**  
  Academic calendar parsing automatically adjusts predictions for holidays, intersessions, and closures (e.g. enforcing 0 occupancy on Thanksgiving).

**Why it works:**  
The model understands context—not just averages. A holiday Monday behaves like a Sunday, and 5 PM in July is fundamentally different from 5 PM in January.

---

## Architecture & Workflow

The system follows a **four-stage data pipeline**, from raw logs to actionable forecasts.

### 1. Data Ingestion & Simulation

- **Input:**  
  Raw CSV logs (800k+ rows) of anonymized swipe-ins
- **Process:**  
  Exit times are simulated using a **Truncated Normal Distribution**  
  - Mean: 67.5 minutes  
  - Range: 20–180 minutes
- **Output:**  
  Reconstructed timeline of *virtual occupancy*

---

### 2. Feature Engineering

The reconstructed timeline is transformed into a training dataset with features including:

- `Hour_of_Day`
- `Day_of_Week`
- `Month` (seasonality)
- `Is_Holiday` (derived from academic calendar)

---

### 3. Model Training

A **Random Forest Regressor** (`n_estimators = 100`) is trained on the reconstructed history.

**Why Random Forest?**

- Handles non-linear relationships
- Captures feature interactions (e.g. *Monday + Semester Break*)
- Robust to noise from simulated data

---

### 4. Forecasting & Rules Layer

- The model generates predictions for **every hour of 2026**
- A deterministic **rules layer** enforces facility constraints from the official schedule PDF:
  - Closed → occupancy forced to `0`
  - Reduced hours → truncated predictions

---

## Tech Stack

| Domain | Technology | Purpose |
|-----|-----|-----|
| Language | Python 3.9 | Core logic |
| Data Processing | Pandas, NumPy | Time-series manipulation |
| Machine Learning | Scikit-Learn | Random Forest regression |
| Statistics | SciPy | Truncated normal distribution |
| Visualization | Matplotlib | Validation charts & heatmaps |

---

## Results

The model produces a **365-day smart calendar** for gym-goers.

### Model Performance

- **RMSE:** ~66  
  *(Predictions within ±66 people of actuals)*  
- **R² Score:** 0.69  
  *(Explains ~70% of traffic variance)*

---

### Visual Insights

**Daily Traffic Profile**
- Captures both the **morning rush (7 AM)** and **after-work peak (5–7 PM)**

**Sample Week (Nov 4–10)**
- Clearly shows weekly cyclicality and weekend drops

---

### Final Output

The system outputs a `gym_occupancy_2026.csv` file with actionable hourly metrics:

| Date | Day | Hour | Est. People | Capacity % | Daily Peak |
|-----|-----|-----|-----|-----|-----|
| 2026-01-20 | Tuesday | 5 PM | **385** | **85.5%** | **5 PM** |
| 2026-01-20 | Tuesday | 9 PM | **150** | **33.3%** | 5 PM |
| 2026-07-04 | Saturday | 2 PM | **0** | **0.0%** | CLOSED |

---

## Future Improvements

- **Weather Integration**  
  Correlate rain/snow with gym usage via weather APIs
- **Web Interface**  
  Deploy predictions to a React / Next.js dashboard
- **Real-Time Adjustment**  
  Introduce a feedback loop using live swipe data

---

## Author

**Thomas Yousef**


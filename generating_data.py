import csv
import random
from datetime import datetime, timedelta
import numpy as np

# Configuration
start_date = datetime(2024, 1, 1)  # Start of Spring semester
end_date = datetime(2024, 4, 30)   # End of Spring semester
output_file = 'bu_gym_entries_spring.csv'

# Time slot usage patterns (weekday)
time_slots = {
    (6, 9): 0.15,
    (9, 12): 0.10,
    (12, 14): 0.20,
    (14, 17): 0.10,
    (17, 20): 0.30,
    (20, 23): 0.15
}

# Estimate number of users per day with noise and semester trends
def estimate_daily_users(date):
    # Base users by month
    if date.month in [1]:  # January — New Year's resolution boost
        base = 600
    elif date.month in [2, 3]:
        base = 500
    else:
        base = 450

    # Add semester start spike (first 3 weeks)
    if (date - datetime(date.year, date.month, 1)).days < 21:
        base *= 1.2

    # Lower usage on weekends
    if date.weekday() >= 5:
        base *= 0.6

    # Add noise (±10%)
    noise = random.uniform(0.9, 1.1)
    return int(base * noise)

# Generate a timestamp using a normal distribution centered in the slot
def generate_timestamp(date, start_hour, end_hour):
    center = (start_hour + end_hour) / 2
    hour = int(np.clip(np.random.normal(center, 0.7), start_hour, end_hour - 0.01))
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return datetime(date.year, date.month, date.day, hour, minute, second)

# Generate entries
entries = []
used_timestamps = set()
current_date = start_date

while current_date <= end_date:
    num_users = estimate_daily_users(current_date)

    for (start_hour, end_hour), percentage in time_slots.items():
        slot_users = int(num_users * percentage)

        for _ in range(slot_users):
            user_id = f"U{random.randint(100000, 999999)}"
            timestamp = generate_timestamp(current_date, start_hour, end_hour)

            # Avoid duplicates
            while (user_id, timestamp) in used_timestamps:
                timestamp = generate_timestamp(current_date, start_hour, end_hour)

            used_timestamps.add((user_id, timestamp))
            entries.append((user_id, timestamp.isoformat()))

    current_date += timedelta(days=1)

# Shuffle for realism
random.shuffle(entries)

# Save to CSV
with open(output_file, mode='w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['userID', 'timestamp'])
    writer.writerows(entries)

print(f"✅ Generated {len(entries)} gym entry records for BU Spring 2024 → {output_file}")

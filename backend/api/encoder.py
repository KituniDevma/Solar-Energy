import pandas as pd
import pytz

def json_to_csv(json_data):
    timezone = pytz.timezone('Asia/Colombo')

    try:
        daysd = json_data['days']
        hoursd = [hour for day in daysd for hour in day['hours']]
        df = pd.DataFrame(hoursd)
        df.drop(['datetime'], axis=1, inplace=True)

        df['datetimeEpoch'] = pd.to_datetime(df['datetimeEpoch'], unit='s')
        df['datetimeEpoch'] = df['datetimeEpoch'].dt.tz_localize('UTC').dt.tz_convert(timezone)
        df['datetimeEpoch'] = df['datetimeEpoch'].dt.strftime('%Y-%m-%d %H:%M')

        selected = df[['datetimeEpoch', 'temp', 'dew', 'humidity', 'winddir', 'windspeed', 'pressure', 'cloudcover', 'solarradiation']]
        selected.rename(columns={'datetimeEpoch': 'date'}, inplace=True)
        selected.to_csv('./model/dataset/data.csv', index=False)
        return 1
    except Exception as e:
        return e
    
# Function to encode DataFrame into JSON
def encoder(width, length):
    df = pd.read_csv('./model/results/real_prediction.csv')
    df, mean_ot, sum_se = calculate_solar_energy(df, width, length)
    json_data = df.to_json(orient='split')  # Encode DataFrame into JSON
    return json_data, mean_ot, sum_se

# Function to decode JSON back into DataFrame
def decoder(json_data, width, length):
    df = pd.read_json(json_data, orient='split')  # Decode JSON back into DataFrame
    df, mean_ot, sum_se = calculate_solar_energy(df, width, length)
    df.to_csv('./model/results/real_prediction.csv', index=False)
    return mean_ot, sum_se

def calculate_solar_energy(df, width, length):
    """
    Function to calculate solar energy (Wh) from solar radiation (W/m²) for each hour.

    Args:
        df (pd.DataFrame): DataFrame containing the 'OT' column for solar radiation.
        width (float): Width of the solar panel in meters.
        length (float): Length of the solar panel in meters.
    
    Returns:
        pd.DataFrame: DataFrame with an added 'SE' column containing solar energy in Wh.
    """
    # Calculate the area of the solar panel in square meters
    panel_area = width * length
    efficiency = 0.2  # Assuming an efficiency of 20% for a typical solar panel
    
    # Check if 'OT' column exists in the DataFrame
    if 'OT' not in df.columns:
        raise ValueError("Column 'OT' not found in the DataFrame.")
    
    # Calculate solar energy in Wh and add it to the 'SE' column
    df['SE'] = df['OT'] * panel_area * efficiency  # Each row now has Wh\

    mean_ot = df['OT'].mean()
    sum_se = df['SE'].sum()
    
    return df, mean_ot, sum_se
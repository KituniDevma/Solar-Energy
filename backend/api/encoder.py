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
def encoder():
    df = pd.read_csv('./model/results/real_prediction.csv')
    json_data = df.to_json(orient='split')  # Encode DataFrame into JSON
    return json_data

# Function to decode JSON back into DataFrame
def decoder(json_data):
    df = pd.read_json(json_data, orient='split')  # Decode JSON back into DataFrame
    df.to_csv('./model/results/real_prediction.csv', index=False)
    return 0
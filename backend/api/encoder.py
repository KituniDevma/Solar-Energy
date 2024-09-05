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
        selected.to_csv('./model/data.csv', index=False)
        return 1
    except Exception as e:
        return e
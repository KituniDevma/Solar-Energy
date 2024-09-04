import streamlit as st
import pandas as pd
import plotly.express as px

# Set the title of the app
# st.title("Solar Energy Data - Texas, USA")

# Step 3: Load the CSV file
file_path = "solar-energy-nsrdb-texas-usa.csv"

# Read the CSV file into a DataFrame
df = pd.read_csv(file_path)

# # # Display the first few rows of the DataFrame
# st.write("First 5 rows of the dataset:")
# st.dataframe(df.head())

# Step 4: Select columns for plotting
x_column = st.selectbox("Select the X-axis column", df.columns)
y_column = st.selectbox("Select the Y-axis column", df.columns)
 
# Plotting the graph
st.write(f"Graph of {y_column} vs {x_column}:")
fig = px.line(df, x=x_column, y=y_column, title=f"{y_column} vs {x_column}")
st.plotly_chart(fig)

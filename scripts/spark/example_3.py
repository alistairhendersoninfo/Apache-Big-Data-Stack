from pyspark.ml.feature import VectorAssembler
from pyspark.ml.regression import LinearRegression
from pyspark.ml.evaluation import RegressionEvaluator

# Prepare features
df = spark.read.parquet("sales_data.parquet")

# Create features vector
assembler = VectorAssembler(
    inputCols=["customer_id", "product_id", "quantity"],
    outputCol="features"
)

df_ml = assembler.transform(df).select("features", "amount")

# Split data
train, test = df_ml.randomSplit([0.8, 0.2], seed=42)

# Train model
lr = LinearRegression(featuresCol="features", labelCol="amount")
model = lr.fit(train)

# Predictions
predictions = model.transform(test)

# Evaluate
evaluator = RegressionEvaluator(
    labelCol="amount",
    predictionCol="prediction",
    metricName="rmse"
)
rmse = evaluator.evaluate(predictions)
print(f"RMSE: {rmse}")

# Show coefficients
print(f"Coefficients: {model.coefficients}")
print(f"Intercept: {model.intercept}")
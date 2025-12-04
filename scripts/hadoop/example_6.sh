chmod +x mapper.py reducer.py

# Upload to HDFS
hdfs dfs -put mapper.py reducer.py /user/$USER/

# Run streaming job
hadoop jar $HADOOP_HOME/share/hadoop/tools/lib/hadoop-streaming-3.4.0.jar \
  -input /user/$USER/input \
  -output /user/$USER/output_python \
  -mapper /user/$USER/mapper.py \
  -reducer /user/$USER/reducer.py

# View results
hdfs dfs -cat /user/$USER/output_python/part-00000
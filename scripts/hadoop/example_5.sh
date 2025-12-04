# Run word count MapReduce job
hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.4.0.jar \
  wordcount \
  /user/$USER/input \
  /user/$USER/output

# View the results
hdfs dfs -cat /user/$USER/output/part-r-00000
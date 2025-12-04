# Create workflow in GUI: File → New → Workflow
# Add actions:
# 1. Start action
# 2. Pipeline action → Run sales_etl_pipeline.hpl
# 3. SQL action → Run aggregation query
# 4. Mail action → Send completion notification
# 5. Success action (end)

# Connect actions with hops
# Configure conditions (success/failure paths)
# Save as daily_sales_workflow.hwf
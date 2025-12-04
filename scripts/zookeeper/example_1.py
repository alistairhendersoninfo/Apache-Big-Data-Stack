from kazoo.client import KazooClient
import json

# Connect
zk = KazooClient(hosts='localhost:2181')
zk.start()

# Create node
zk.ensure_path("/config")
zk.create("/config/app", json.dumps({
    "version": "1.0",
    "feature_flags": {"new_ui": True}
}).encode())

# Read node
data, stat = zk.get("/config/app")
config = json.loads(data.decode())
print(f"Config: {config}")

# Watch for changes
@zk.DataWatch("/config/app")
def watch_config(data, stat):
    if data:
        print(f"Config changed: {json.loads(data.decode())}")

# Distributed lock
lock = zk.Lock("/locks/mylock", "my-identifier")
with lock:
    print("Holding lock, doing work...")

# Leader election
election = zk.Election("/election", "my-identifier")
election.run(my_leader_function)

zk.stop()
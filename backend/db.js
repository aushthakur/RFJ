// db.js
import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://jayantthakurdigital:KS30sDSaSsIvyKCf@ritualcluster.1j5yhhg.mongodb.net/?retryWrites=true&w=majority&appName=RitualCluster"; 
// 🔹 Replace 'test' with your actual DB name if different

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Connection Error:", err.message));

mongoose.connection.once("open", async () => {
  try {
    const db = mongoose.connection.db;
    const collection = db.collection("users");

    console.log("\n🧩 Checking existing indexes...");
    const indexes = await collection.indexes();
    console.table(indexes);

    // ✅ Drop the username index if it exists
    const indexName = "username_1";
    const indexExists = indexes.some(idx => idx.name === indexName);

    if (indexExists) {
      await collection.dropIndex(indexName);
      console.log(`✅ Index "${indexName}" deleted successfully.`);
    } else {
      console.log(`ℹ️ Index "${indexName}" not found, nothing to delete.`);
    }

    // ✅ (Optional) Delete all documents where username is null
    const deleteResult = await collection.deleteMany({ username: null });
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} documents with username: null`);

    console.log("\n✅ Cleanup completed successfully!");
  } catch (err) {
    console.error("⚠️ Error while cleaning up:", err);
  } finally {
    mongoose.connection.close();
  }
});

